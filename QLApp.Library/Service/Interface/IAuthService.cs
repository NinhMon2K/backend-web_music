using QLApp.Core.Entities.Dictionary;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Library.Service.Interface
{
    public interface IAuthService
    {


        void SetUser(User user);
        User GetCurrentUser();

    }
}
