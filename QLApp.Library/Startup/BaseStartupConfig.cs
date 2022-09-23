using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using QLApp.Library.Collection;
using QLApp.Library.Service.Interface;
using QLApp.Library.Service.Implementtion;

namespace QLApp.Library.Startup
{
    public static class BaseStartupConfig
    {
        public static void ConfigureService(ref IServiceCollection services, IConfiguration configuration, bool isApi)
        {

            services.AddMemoryCache();
            services.AddHttpContextAccessor();

            services.AddTransient<IConfigService, ConfigService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IDataService, DataService>();
            services.AddSingleton<IStorageService, StorageService>();
            services.AddTransient<AppCollection, AppCollection>();
        }
    }
}
