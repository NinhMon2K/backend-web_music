using Microsoft.Extensions.Caching.Memory;
using QLApp.Library.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace QLApp.Library.Service.Implementtion
{
    public class CacheService : ICacheService
    {

        private readonly IMemoryCache _memoryCache;
        private readonly IConfigService _configService;

        public CacheService(IMemoryCache memoryCache, IConfigService configService)
        {
            _memoryCache = memoryCache;
            _configService = configService;
        }

        public void SetCache<T>(string key, T value)
        {
            _memoryCache.Set<T>(key, value);
        }

        public void DeleteCache(string key)
        {
            _memoryCache.Remove(key);
        }

        public T GetCache<T>(string key)
        {
            return _memoryCache.Get<T>(key);
        }

        public void Delete(string key)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(string key)
        {
            throw new NotImplementedException();
        }

        public T Get<T>(string key)
        {
            return GetCache<T>(key);
        }

        public Task<T> GetAsync<T>(string key)
        {
            throw new NotImplementedException();
        }

        public bool IsExistAsync(string key)
        {
            var res = false;
            try
            {
                var value = GetCache<object>(key);
                res = value != null;
            }
            catch (Exception)
            {

            }

            return res;
        }

        public void Set<T>(string key, object val)
        {
            SetCache<T>(key, (T)val);
        }

        public Task SetAsync<T>(string key, object val)
        {
            throw new NotImplementedException();
        }

        Task<bool> ICacheService.IsExistAsync(string key)
        {
            throw new NotImplementedException();
        }
    }
}
