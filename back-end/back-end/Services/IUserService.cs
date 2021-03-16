using back_end.Models;
using back_end.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace back_end.Services
{
    public interface IUserService
    {
        LoginResponse Auth(LoginModel user);
    }
}
