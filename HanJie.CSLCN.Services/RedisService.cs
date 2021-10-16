using HanJie.CSLCN.Common;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<bool> ObjectSetAsync<T>(string key, T value) where T : class, new()
        {
            Ensure.NotNull(key, nameof(key));
            Ensure.NotNull(value, nameof(value));

            return await _db.StringSetAsync(key, JsonConvert.SerializeObject(value));
        }

        public T ObjectGet<T>(string key) where T : class, new()
        {
            Ensure.NotNull(key, nameof(key));

            RedisValue queryResult = _db.StringGet(key);

            if (!queryResult.HasValue)
                return null;

            return JsonConvert.DeserializeObject<T>(queryResult.ToString());
        }
    }


}
