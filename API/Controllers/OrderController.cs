using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using API.Extensions;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        //private object orderDTO;
        private readonly ILogger<OrderController> _logger;

        public OrderController(IConfiguration config, DataContext context, ILogger<OrderController> logger)
        {
            _config = config;
            _context = context;
            _logger = logger;
        }


        [HttpGet("GetOrders")]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {

            return await _context.Orders.Include(i => i.OrderItems)
            .Where(t => t.CustomerId == User.Identity!.Name)
            .OrderToDTO()
            .ToListAsync();
        }
        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO?>> GetOrder(int id)
        {

            return await _context.Orders.Include(i => i.OrderItems)
            .Where(t => t.CustomerId == User.Identity!.Name && t.Id == id)
            .OrderToDTO()
            .FirstOrDefaultAsync();

        }
        [HttpPost("CreateOrder")]

        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDTO dto)
        {
            var cart = await _context.Carts.Include(i => i.CartItems)
            .ThenInclude(t => t.Product)
            .Where(i => i.CostumerId == User.Identity!.Name)
            .FirstOrDefaultAsync();

            if (cart == null) return BadRequest(new ProblemDetails { Title = "Kart alma aşamasında hata oluştu." });

            var items = new List<Entity.OrderItem>();

            foreach (var item in cart.CartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);

                var orderItem = new Entity.OrderItem
                {
                    ProductId = product!.Id,
                    ProductName = product.Name!,
                    ProductImage = product.ImageUrl!,
                    Price = product.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
                product.Stock -= item.Quantity;
            }

            var subTotal = items.Sum(i => i.Price * i.Quantity);
            var deliveryFee = 0;

            var order = new Order
            {
                OrderItems = items,
                CustomerId = User.Identity!.Name,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Phone = dto.Phone,
                City = dto.City,
                AddresLine = dto.AddresLine,
                SubTotal = subTotal,
                DeliveryFee = deliveryFee,
            };

            var paymentResult = await ProcessPayment(dto, cart);
            
            if(paymentResult.Status == "failure"){
                return BadRequest(new ProblemDetails{Title = "Ödeme Hatası. "+paymentResult.ErrorMessage+"."});
            }

            order.ConversationId = paymentResult.ConversationId;
            order.BasketId = paymentResult.BasketId;
        
            await _context.Orders.AddAsync(order);
            _context.Carts.Remove(cart);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order.Id);


            return BadRequest(new ProblemDetails { Title = "Sipariş oluşturma aşamasında hata oluştu." });
        }


        private async Task<Payment> ProcessPayment(CreateOrderDTO model,Cart cart)
        {
            _logger.LogInformation("numara "+model.CardNumber);
            Options options = new Options();
            options.ApiKey = _config["PaymentApi:ApiKey"];
            options.SecretKey =  _config["PaymentApi:SecretKey"];
            options.BaseUrl = "https://sandbox-api.iyzipay.com";

            CreatePaymentRequest request = new CreatePaymentRequest();
            request.Locale = Locale.TR.ToString();
            request.ConversationId = Guid.NewGuid().ToString();
            request.Price = cart.CalculateTotal().ToString();
            request.PaidPrice = cart.CalculateTotal().ToString();
            request.Currency = Currency.TRY.ToString();
            request.Installment = 1;
            request.BasketId =  cart.CartId.ToString();
            request.PaymentChannel = PaymentChannel.WEB.ToString();
            request.PaymentGroup = PaymentGroup.PRODUCT.ToString();

            PaymentCard paymentCard = new PaymentCard();
            paymentCard.CardHolderName = model.CardName;
            paymentCard.CardNumber = model.CardNumber; 
            //paymentCard.CardNumber = "5528790000000008";
            paymentCard.ExpireMonth = model.CardExpireMonth;
            paymentCard.ExpireYear = model.CardExpireYear;
            paymentCard.Cvc = model.CardCvc;
            paymentCard.RegisterCard = 0;
            request.PaymentCard = paymentCard;

            Buyer buyer = new Buyer();
            buyer.Id = "BY789";
            buyer.Name = model.FirstName;
            buyer.Surname = model.LastName;
            buyer.GsmNumber = model.Phone;
            buyer.Email = "email@email.com";
            buyer.IdentityNumber = "74300864791";
            buyer.LastLoginDate = "2015-10-05 12:43:35";
            buyer.RegistrationDate = "2013-04-21 15:12:09";
            buyer.RegistrationAddress = model.AddresLine;
            buyer.Ip = "85.34.78.112";
            buyer.City = model.City;
            buyer.Country = "Turkey";
            buyer.ZipCode = "34732";
            request.Buyer = buyer;

            Address shippingAddress = new Address();
            shippingAddress.ContactName = model.FirstName + " " +model.LastName;
            shippingAddress.City = model.City;
            shippingAddress.Country = "Turkey";
            shippingAddress.Description = model.AddresLine;
            shippingAddress.ZipCode = "34742";
            request.ShippingAddress = shippingAddress;

            request.BillingAddress = shippingAddress;

            List<BasketItem> basketItems = new List<BasketItem>();
            foreach (var item in cart.CartItems)
            {
                BasketItem basketItem = new BasketItem();
                basketItem.Id = item.ProductId.ToString();
                basketItem.Name = item.Product.Name;
                basketItem.Category1 = "Watch";
                basketItem.ItemType = BasketItemType.PHYSICAL.ToString();
                basketItem.Price = ((double)item.Product.Price * (double)item.Quantity).ToString();
                basketItems.Add(basketItem);
            }
            request.BasketItems = basketItems;

            return await Payment.Create(request, options);
        }

    }
}