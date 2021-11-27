using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace HanJie.CSLCN.Services
{
    public interface IRedisService
    {
        T ObjectGet<T>(string key) where T : class, new();
        bool ObjectSet<T>(string key, T value) where T : class, new();
        string StringGet(string key);
        RedisValue StringSet(string key, string value, TimeSpan? expiredAfter = null);
        bool ListAdd(string key, string value, TimeSpan expiredAfter);
        List<string> ListGet(string key);
        bool ListContains(string key, string value);
    }
}