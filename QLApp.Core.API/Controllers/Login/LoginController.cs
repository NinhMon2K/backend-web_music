using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLApp.Core.API.Base;
using QLApp.Core.BL.Base;
using QLApp.Core.BL.Login;
using QLApp.Core.Entities.Data;
using QLApp.Core.Entities.Dictionary;
using QLApp.Library.Collection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace QLApp.Core.API.Controllers.Login
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : BaseController
    {
        public LoginController(AppCollection service) : base(service)
        {

        }
        [HttpGet("Login")]
        public async Task<ServiceResult> CheckUser(string UserName, string Password)
        {
            var res = new ServiceResult();

            try
            {
                var user = await BLFactory.CreateAs<LoginBL>(_service).GetUser(UserName, Password);

                if (user != null)
                {
                    //var a = _httpA
                    res.Data = user;
                }
                else
                {
                    res.Data = false;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return res;
        }

        [HttpGet("CheckUser")]
        public async Task<ServiceResult> GetTaiKhoan(string UserName)
        {
            var res = new ServiceResult();

            try
            {
                var user = await BLFactory.CreateAs<LoginBL>(_service).GetTaiKhoan(UserName);

                if (user != null)
                {
                    _service.AuthService.SetUser(user);
                    //var a = _httpA
                    res.Data = true;
                }
                else
                {
                    res.Data = false;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return res;
        }

        [HttpPost("Register")]
        public async Task<ServiceResult> RegisterUser([FromBody] User user)
        {
            var res = new ServiceResult();

            try
            {

                res.Data = await BLFactory.CreateAs<LoginBL>(_service).RegisterUser(user);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return res;
        }

        [HttpPost("SaveImage")]
        public async Task<ServiceResult> SaveImageDish(IFormFile file)
        {
            var res = new ServiceResult();

            try
            {
                var formData = HttpContext.Request.Form;

                if (file != null)
                {
                    var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(originalFileName);
                    await _service.StorageService.SaveFileAsync(file.OpenReadStream(), fileName);
                    res.Data = "/saveimage/" + fileName;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return res;
        }
    }
}
