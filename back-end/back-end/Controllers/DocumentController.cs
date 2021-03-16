using back_end.Models;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]

    public class DocumentController : ControllerBase
    {

        [HttpGet("{email}")]
        public IActionResult Get(string email)
        {
            Answer ans = new Answer();
            ans.Success = 0;
            using (duujeodoq7bvqContext db = new duujeodoq7bvqContext())
            {
                var user = db.Users.Where(u => u.Email == email).FirstOrDefault();
                var docs = db.Documents.Where(d => d.UserId == user.Id).Select(x=>new Document { 
                    Id=x.Id,
                    UserId=x.UserId,
                    NameFile=x.NameFile,
                    Path=x.Path,
                    User=null
                }).ToList();
                ans.Success = 1;
                ans.Data = docs;
            }
            return Ok(ans);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Document doc)
        {
            Answer ans = new Answer();
            Document docResponse = doc;
            if (docResponse == null)
            {
                ans.Success = 0;
                ans.Message = "Por favor rellene todos los campos";
                return BadRequest(ans);
            }
            docResponse.User = null;
            docResponse.NameFile = doc.NameFile;
            docResponse.Path = doc.Path;
            docResponse.UserId = doc.UserId;
            using (duujeodoq7bvqContext db = new duujeodoq7bvqContext())
            {
                db.Documents.Add(docResponse);
                db.SaveChanges();
            }
            ans.Success = 1;
            ans.Data = docResponse;
            return Ok(ans);
        }


    }
}
