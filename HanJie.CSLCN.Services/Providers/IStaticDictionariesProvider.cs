using System.Collections.Generic;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services.Providers
{
    public interface IStaticDictionariesProvider
    {
        Dictionary<int, Dictionary<string, ViewsCountDto>> WikiPassageViewersCountDictionary { get; }
    }
}