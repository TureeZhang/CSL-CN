using Autofac.Extras.Moq;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Enums;
using HanJie.CSLCN.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace HanJie.CSLCN.Tests
{
    public class TestMenuService
    {
        [Fact]
        public async Task TestCreateMenu_ShouldWriteOKAsync()
        {
            using (var mock = AutoMock.GetLoose())
            {
                MenuService service = mock.Create<MenuService>();

                await service.AddMainMenuAsync("主页");   //1
                await service.AddMainMenuAsync("快速起步");  //2
                await service.AddMainMenuAsync("常用MOD");        //3
                await service.AddMainMenuAsync("最新消息"); //4
                await service.AddMainMenuAsync("请开发者吃饭");  //5

                await service.AddFirstChildMenuAsync("如何修路", 2);
                await service.AddFirstChildMenuAsync("如何修水管", 2);
                await service.AddFirstChildMenuAsync("如何分区", 2);

                await service.AddFirstChildMenuAsync("连连乐", 3);
                await service.AddFirstChildMenuAsync("挪挪乐", 3);
                await service.AddFirstChildMenuAsync("Forest Brush v.1.2.5", 3);

                await service.AddFirstChildMenuAsync("校园 DLC", 4);
                await service.AddFirstChildMenuAsync("开发者日志（十八）", 4);

                Assert.True((await service.GetById(1)).Name == "主页");

            }

            
        }

        //[Fact]
        //public async Task TestGetAllMenus_ShouldReturnAllMenusAsync()
        //{
        //    MenuService service = new MenuService();
        //    Dictionary<Menu, List<Menu>> result = await service.GetAllMenusAsync();

        //    Assert.True(result.Count > 0);
        //}

    }
}
