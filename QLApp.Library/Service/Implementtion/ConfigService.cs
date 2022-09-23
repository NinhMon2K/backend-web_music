using Microsoft.Extensions.Configuration;
using QLApp.Library.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Library.Service.Implementtion
{
    public class ConfigService : IConfigService
    {

        private readonly IConfigurationSection _appSetting;
        private readonly IConfigurationSection _connectionString;
        private readonly IConfigurationSection _authConfig;


        public ConfigService(IConfiguration configuration)
        {
            //_appSetting = configuration.GetSection("AppSettings");
            _connectionString = configuration.GetSection("ConnectionString");
            //_authConfig = configuration.GetSection("AuthConfig");
        }

        public string GetAppSetting(string key)
        {
            throw new NotImplementedException();
        }

        public string GetAuthConfig(string key, string defaultValue = null)
        {
            throw new NotImplementedException();
        }

        public string GetConnectionString()
        {
            return _connectionString.Value;
        }
    }
}
