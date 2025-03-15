using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenServices
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IConfiguration _config;
    public TokenServices(UserManager<AppUser> userManager,IConfiguration config){
        _userManager = userManager;
        _config = config;

    }

    public async Task<string> GenerateToken(AppUser user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(ClaimTypes.NameIdentifier,user.Id!),
            new Claim(ClaimTypes.Name,user.UserName!),
            new Claim(ClaimTypes.GivenName,user.FullName!)
        };

        var roles =await _userManager.GetRolesAsync(user);
        foreach (var role in roles){
            claims.Append(new Claim(ClaimTypes.Role,role));
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key =new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["Security:SecretKey"]!));

        var tokenSettings = new SecurityTokenDescriptor{
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(30),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenSettings);
        return tokenHandler.WriteToken(token);

    }
}