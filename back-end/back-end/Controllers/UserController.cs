using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Models;
using back_end.Services;
using Microsoft.AspNetCore.Authorization;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        

        [HttpGet("{email}")]
        public IActionResult Get( string email)
        {
            Answer ans = new Answer();
            ans.Success = 0;
            using (duujeodoq7bvqContext db = new duujeodoq7bvqContext())
            {
                var userResponse = db.Users.Where(u=>u.Email== email).FirstOrDefault();
                ans.Success = 1;
                ans.Data = userResponse;
            }
            return Ok(ans);
        }
    }
}
