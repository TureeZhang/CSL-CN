using HanJie.CSLCN.Common;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace HanJie.CSLCN.Services
{
    public class RedisService : IRedisService
    {
        private static IDatabase _db;

        public RedisService()
        {
            Connect();
        }

        private void Connect()
        {
            if (RedisService._db != null)
                return;

            Ensure.NotNull(GlobalConfigs.AppSettings.Redis, nameof(GlobalConfigs.AppSettings.Redis));
            Ensure.NotNull(GlobalConfigs.AppSettings.Redis.Host, nameof(GlobalConfigs.AppSettings.Redis.Host));

            ConfigurationOptions options = new ConfigurationOptions();
            options.EndPoints.Add($"{GlobalConfigs.AppSettings.Redis.Host}:{GlobalConfigs.AppSettings.Redis.Port}");
            options.Password = GlobalConfigs.AppSettings.Redis.Password;
            options.AbortOnConnectFail = false;
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect(options);
            RedisService._db = redis.GetDatabase();
        }

        public bool ObjectSet<T>(string key, T value) where T : class, new()
        {
            Ensure.NotNull(key, nameof(key));
            Ensure.NotNull(value, nameof(value));

            return _db.StringSet(key, JsonConvert.SerializeObject(value));
        }

        public T ObjectGet<T>(string key) where T : class, new()
        {
            Ensure.NotNull(key, nameof(key));

            RedisValue queryResult = _db.StringGet(key);

            if (!queryResult.HasValue)
                return null;

            return JsonConvert.DeserializeObject<T>(queryResult.ToString());
        }

        public RedisValue StringSet(string key, string value, TimeSpan? expiredAfter = null)
        {
            Ensure.NotNull(key, nameof(key));
            Ensure.NotNull(value, nameof(value));

            return _db.StringSet(key, value, expiredAfter ?? new TimeSpan(24, 0, 0));
        }

        public string StringGet(string key)
        {
            Ensure.NotNull(key, nameof(key));
            return _db.StringGet(key);
        }

        public bool ListAdd(string key, string value, TimeSpan expiredAfter)
        {
            return _db.SetAdd(key, value);
        }

        public List<string> ListGet(string key)
        {
            RedisValue[] strs = _db.SetMembers(key);
            List<string> list = new List<string>();
            foreach (string item in strs)
            {
                list.Add(item);
            }

            return list;
        }

        public bool ListContains(string key, string value)
        {
            return _db.SetContains(key, value);
        }

    }
}
