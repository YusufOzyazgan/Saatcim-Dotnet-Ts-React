
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]/")]
public class ErrorController : ControllerBase
{      
    
    [HttpGet("not-found")]
    public IActionResult ErrorNotFound(){
        return NotFound();
    }
    [HttpGet("bad-request")]
    public IActionResult BadRequestError(){
        return BadRequest();
    }
    
    [HttpGet("unauthorized")]
    public IActionResult UnauthorizedError(){
        return Unauthorized(); //401
    }
    
    [HttpGet("valid-error")]
    public IActionResult ValidError(){
        ModelState.AddModelError("Validation error 1", "Validation error details");
        ModelState.AddModelError("Validation error 2", "Validation error details");
        return ValidationProblem();
    }
    
    [HttpGet("server-error")]
    public IActionResult ServerError(){
        throw new Exception("server-error");
    }
    
    

}
