using API.Data;
using API.DTO;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]/[action]")]
public class AccountController : ControllerBase
{

    private readonly TokenServices _tokenServices;
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<AppRole> _roleManager;
    private readonly DataContext _context;

    public AccountController(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, TokenServices tokenServices, DataContext context)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _tokenServices = tokenServices;
        _context = context;

    }

    [HttpPost]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO model)
    {
        if (ModelState.IsValid)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return BadRequest(new ProblemDetails { Title = "Kullanıcı adı hatalı!" });
            }

            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            if (result)
            {
                var userCart = await GetOrCreate(model.UserName);
                var cookieCart = await GetOrCreate(Request.Cookies["customerId"]!);
                if(userCart != null){
                    foreach(var i in userCart.CartItems){
                        cookieCart.AddItem(i.Product, i.Quantity);
                    }
                    _context.Carts.Remove(userCart);
                }

                cookieCart.CostumerId = model.UserName;
                await _context.SaveChangesAsync();
                
                return Ok(new UserDTO { Token = await _tokenServices.GenerateToken(user), Name = user.FullName! });
            }
            return BadRequest(new ProblemDetails { Title = "Parola Hatalı!" });
        }

        return BadRequest("Hata oluştu lütfen daha sonra tekrar deneyiniz.");


    }

    [HttpPost]
    public async Task<IActionResult> Register(RegisterDTO model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = new AppUser
        {
            UserName = model.UserName,
            Email = model.Email,
            FullName = model.FullName
        };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "Customer");
            return StatusCode(201);
        }

        return BadRequest(result.Errors);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name!);
        if (user == null)
        {
            return BadRequest(new ProblemDetails { Title = "Kullanıcı Bulunamadı!" });
        }
        return Ok(new UserDTO { Token = await _tokenServices.GenerateToken(user), Name = user.FullName! });
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
}