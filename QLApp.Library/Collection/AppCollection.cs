using QLApp.Library.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace QLApp.Library.Collection
{
    public class AppCollection
    {
        public IConfigService ConfigService { set; get; }
        public IAuthService AuthService { set; get; }
        public IDataService DataService { set; get; }
        public IStorageService StorageService { set; get; }

        public AppCollection(IConfigService configService, IAuthService authService, IDataService dataService, IStorageService storageService)
        {
            ConfigService = configService;
            DataService = dataService;
            AuthService = authService;
            StorageService = storageService;
        }
    }
}
