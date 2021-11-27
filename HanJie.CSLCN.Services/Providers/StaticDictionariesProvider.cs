using System;
using System.Collections.Generic;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services.Providers
{
    public class StaticDictionariesProvider : IStaticDictionariesProvider
    {
        private readonly IRedisService _redisService;

        public Dictionary<int, Dictionary<string, ViewsCountDto>> WikiPassageViewersCountDictionary => GetViewsDictionaryCache();

        public StaticDictionariesProvider(IRedisService redisService)
        {
            this._redisService = redisService;
        }

        private Dictionary<int, Dictionary<string, ViewsCountDto>> GetViewsDictionaryCache()
        {
            Dictionary<int, Dictionary<string, ViewsCountDto>> result = this._redisService.ObjectGet<Dictionary<int, Dictionary<string, ViewsCountDto>>>(StringConsts.ViewsCountDictionary);

            if (result == null)
            {
                result = new Dictionary<int, Dictionary<string, ViewsCountDto>>();
                 this._redisService.ObjectSet(StringConsts.ViewsCountDictionary, result);
            }

            return result;
        }
    }
}
