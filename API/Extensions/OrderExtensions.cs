using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> OrderToDTO(this IQueryable<Order> query)
        {
            return query.Select(t => new OrderDTO
            {
                Id = t.Id,
                OrderDate = t.OrderDate,
                FirstName = t.FirstName,
                LastName = t.LastName,
                Phone = t.Phone,
                City = t.City,
                AddresLine = t.AddresLine,
                CustomerId = t.CustomerId,
                OrderStatus = t.OrderStatus,
                SubTotal = t.SubTotal,
                DeliveryFee = t.DeliveryFee,
                OrderItems = t.OrderItems.Select(o => new OrderItemDTO{
                    Id = o.Id,
                    ProductName = o.ProductName,
                    ProductId = o.ProductId,
                    ProductImage = o.ProductImage,
                
                    Price = o.Price,
                    Quantity = o.Quantity
                }).ToList()

                
            });
        }
    }
}