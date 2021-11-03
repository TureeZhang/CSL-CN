using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace HanJie.CSLCN.Services
{
    public interface IRedisService
    {
        Task<bool> ListAdd(string key, string value);
        Task<bool> ListContains(string key, string value);
        Task<List<string>> ListGet(string key);
        T ObjectGet<T>(string key) where T : class, new();
        Task<bool> ObjectSetAsync<T>(string key, T value) where T : class, new();
        Task<string> StringGetAsync(string key);
        Task<RedisValue> StringSetAsync(string key, string value, TimeSpan? expiredAfter = null);
    }
}