using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Library.Service.Interface
{
    public interface IConfigService
    {

        string GetAuthConfig(string key, string defaultValue = null);

        string GetAppSetting(string key);
        string GetConnectionString();

    }
}
