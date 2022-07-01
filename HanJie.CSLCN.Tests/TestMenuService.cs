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

                service.AddMainMenu("主页");   //1
                service.AddMainMenu("快速起步");  //2
                service.AddMainMenu("常用MOD");        //3
                service.AddMainMenu("最新消息"); //4
                service.AddMainMenu("请开发者吃饭");  //5

                service.AddFirstChildMenu("如何修路", 2);
                service.AddFirstChildMenu("如何修水管", 2);
                service.AddFirstChildMenu("如何分区", 2);

                service.AddFirstChildMenu("连连乐", 3);
                service.AddFirstChildMenu("挪挪乐", 3);
                service.AddFirstChildMenu("Forest Brush v.1.2.5", 3);

                service.AddFirstChildMenu("校园 DLC", 4);
                service.AddFirstChildMenu("开发者日志（十八）", 4);

                Assert.True(( service.GetById(1)).Name == "主页");

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
