using QLApp.Core.BL.Base;
using QLApp.Core.Entities.Dictionary;
using QLApp.Library.Collection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace QLApp.Core.BL.Login
{
    public class LoginBL : BaseBL
    {
        public LoginBL(AppCollection service) : base(service)
        {
        }
        public async Task<bool> RegisterUser(User user)
        {
            return await _service.DataService.ExcuteSaveAsync("Proc_Insert_User", user);
        }
        public async Task<User> GetUser(string UserName, string Password)
        {
            var us = await _service.DataService.GetObjectAsync<User>("Proc_Get_User", new object[] { UserName, Password });

            if (us != null)
            {
                _service.AuthService.SetUser(us);
            }

            return us;
        }
        public async Task<User> GetTaiKhoan(string UserName)
        {
            var ids = await _service.DataService.GetDataAsync<string>("Proc_Checks_TaiKhoan", new object[] { UserName });

            if (ids != null && ids.Count > 0)
            {
                var userID = ids[0];
                return new User();
            }
            else
            {
                return null;
            }

        }


    }
}
