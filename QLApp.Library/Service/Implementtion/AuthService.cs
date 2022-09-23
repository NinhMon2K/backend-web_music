using Microsoft.AspNetCore.Http;
using QLApp.Core.Entities.Dictionary;
using QLApp.Core.Entities.Enum;
using QLApp.Library.Model;
using QLApp.Library.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Library.Service.Implementtion
{
    public class AuthService : IAuthService
    {
        public static IList<Dictionary<string, User>> users;

        public AuthService()
        {

        }

        public User UserInfo
        {
            get
            {
                return Login.user;
            }
        }

        public User GetCurrentUser()
        {
            return Login.user;
        }

        public void SetUser(User user)
        {
            Login.user = user;
        }

    }
}
