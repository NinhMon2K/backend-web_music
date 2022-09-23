using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace QLApp.Library.Service.Interface
{
    public interface ICacheService
    {


        Task<bool> IsExistAsync(string key);

        Task SetAsync<T>(string key, object val);

        Task DeleteAsync(string key);
        Task<T> GetAsync<T>(string key);
        void Set<T>(string key, object val);

        T Get<T>(string key);
        void Delete(string key);
    }
}
