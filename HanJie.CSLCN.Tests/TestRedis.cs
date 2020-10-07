using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace HanJie.CSLCN.Tests
{
    public class TestRedis : TestBaseService
    {
        public TestRedis()
        {
            TestHelper.MockGlobalConfigs();
        }

        [Fact]
        public async void ShouldAddObject()
        {
            RedisService redisService = new RedisService();


            Dictionary<int, Dictionary<string, ViewsCountDto>> dic = new Dictionary<int, Dictionary<string, ViewsCountDto>>();
            Dictionary<string, ViewsCountDto> temp = new Dictionary<string, ViewsCountDto>();
            temp.Add("192.168.1.1", new ViewsCountDto() { NewViews = 3, LastUpdateTime = DateTime.Now });
            dic.Add(1, temp);


            await redisService.ObjectSetAsync("viewsCountDic-test", dic);

            Dictionary<int, Dictionary<string, ViewsCountDto>> dicResult = redisService.ObjectGet<Dictionary<int, Dictionary<string, ViewsCountDto>>>("viewsCountDic");
            Assert.Equal(3, dicResult[1]["192.168.1.1"].NewViews);


        }
    }
}
