using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class LoginResponse
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
