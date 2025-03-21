using API.DTO;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]/[action]")]
public class AccountController : ControllerBase{
    
    private readonly TokenServices _tokenServices;
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<AppRole> _roleManager;

    public AccountController(UserManager<AppUser> userManager,RoleManager<AppRole> roleManager,TokenServices tokenServices){
        _userManager = userManager;
        _roleManager = roleManager;
        _tokenServices = tokenServices;
    }
    
    [HttpPost]
    public async Task<ActionResult> Login (LoginDTO model) 
    {
        if (ModelState.IsValid)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null){
                return BadRequest(new ProblemDetails {Title = "Kullanıcı adı hatalı!"});
            }

            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            if(result)
            {
                
                return Ok(new UserDTO {Token= await _tokenServices.GenerateToken(user),Name = user.FullName! });
            }
            return BadRequest(new ProblemDetails {Title ="Hatalı Parola"});
        }

        return Ok();


    }

    [HttpPost]
    public async Task<IActionResult> Register(RegisterDTO model)
    {
        if(!ModelState.IsValid) return BadRequest(new {message = ModelState});
        
        var user = new AppUser{
            UserName = model.UserName,
            Email = model.Email,
            FullName = model.FullName
        };

        var result = await _userManager.CreateAsync(user,model.Password);
        if (result.Succeeded){
            await _userManager.AddToRoleAsync(user, "Custumer");
            return StatusCode(201);
        }

        return BadRequest(new {message = result.Errors});
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetUser(){
         var user = await _userManager.FindByNameAsync(User.Identity?.Name!);
            if (user == null){
                return BadRequest(new ProblemDetails {Title = "Kullanıcı Bulunamadı!"});
            }
            return new UserDTO {Token= await _tokenServices.GenerateToken(user),Name = user.FullName! };
    }

}