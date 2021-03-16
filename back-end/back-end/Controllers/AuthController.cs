using back_end.Models;
using back_end.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel user)
        {
            Answer ans = new Answer();
            var userResponse = _userService.Auth(user);

            if (userResponse == null) 
            {
                ans.Success = 0;
                ans.Message = "Usuario o contraseña incorrecta";
                return BadRequest(ans);
            }
            ans.Success = 1;
            ans.Data = userResponse;
            return Ok(ans);
        }
    }
}
