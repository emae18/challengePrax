using back_end.Models;
using back_end.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        [HttpPost]
        public IActionResult Register([FromBody] User user)
        {
            Answer ans = new Answer();
            User userResponse = user;
            if (userResponse == null)
            {
                ans.Success = 0;
                ans.Message = "Por favor rellene todos los campos";
                return BadRequest(ans);
            }
            userResponse.ConfirmedOn = System.DateTime.Today;
            userResponse.CreatedOn = System.DateTime.Today;
            userResponse.EmailConfirmed = new BitArray(1);

            userResponse.Role = "user";
            userResponse.Username = userResponse.Role+userResponse.Fullname ;
            userResponse.Password = Encrypt.GetSHA256(userResponse.Password);
            using (duujeodoq7bvqContext db = new duujeodoq7bvqContext())
            {
                db.Users.Add(userResponse);
                db.SaveChanges();
            }
            ans.Success = 1;
            ans.Data = userResponse;
            return Ok(ans);
        }
        [HttpGet]
        public IActionResult Get([FromBody] User user)
        {
            Answer ans = new Answer();
            User userResponse = user;
            if (userResponse == null)
            {
                ans.Success = 0;
                ans.Message = "Por favor rellene todos los campos";
                return BadRequest(ans);
            }
            userResponse.ConfirmedOn = System.DateTime.Today;
            userResponse.CreatedOn = System.DateTime.Today;
            userResponse.EmailConfirmed= new BitArray(0);
            userResponse.Role = "User";
            userResponse.Username = userResponse.Role+ ": " + userResponse.Fullname;

            ans.Success = 1;
            ans.Data = userResponse;
            return Ok(ans);
        }


    }
}
