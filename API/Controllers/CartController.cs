using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;


    public CartController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<CartDTO>> GetCart()
    {
        var cart = await GetOrCreate(getCustomerId());
        return CartToDto(cart);

    }

    [HttpPost]
    public async Task<IActionResult> AddItemToCart(int productId, int quantity)
    {
        var cart = await GetOrCreate(getCustomerId());
        var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == productId);
        if (product == null) return NotFound("The product is not in the database");

        cart.AddItem(product, quantity);
        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtAction(nameof(GetCart), CartToDto(cart));

        return BadRequest(new ProblemDetails { Title = "The product ca'not be added to cart" });
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteItemFromCart(int productId, int quantity)
    {
        var cart = await GetOrCreate(getCustomerId());
        cart.DeleteItem(productId, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        if (result) return CreatedAtAction(nameof(GetCart), CartToDto(cart));

        return BadRequest(new ProblemDetails { Title = "Problem occured while removing item from the cart" });
    }

    private string getCustomerId()
    {
        return User.Identity?.Name ?? Request.Cookies["customerId"]!;
    }

    private async Task<Cart> GetOrCreate(string costId)
    {
        var cart = await _context.Carts.Where(t => t.CostumerId == costId)
       .Include(t => t.CartItems)
       .ThenInclude(t => t.Product)
       .FirstOrDefaultAsync();

        if (cart == null)
        {
            var customerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(customerId))
            {
                customerId = Guid.NewGuid().ToString();

                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddMonths(1),
                    IsEssential = true,
                };
                Response.Cookies.Append("customerId", customerId, cookieOptions);
            }
            cart = new Cart { CostumerId = customerId };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }
        return cart;
    }

    private CartDTO CartToDto(Cart cart)
    {

        return new CartDTO
        {
            CartId = cart.CartId,
            CostumerId = cart.CostumerId,
            CartItems = cart.CartItems.Select(i => new CartItemDTO
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                Price = i.Product.Price,
                Name = i.Product.Name,
                ImageUrl = i.Product.ImageUrl

            }).ToList()
        };
    }
}
