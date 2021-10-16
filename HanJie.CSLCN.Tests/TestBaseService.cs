using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace HanJie.CSLCN.Tests
{
    public class TestBaseService
    {
        //[Fact]
        //public async Task TestBaseServiceDbWrite_ShouldCreateAsync()
        //{
        //    var service = new WikiPassageService();

        //    await service.AddAsync(BuildOneEntity(),1);
        //    WikiPassage passage = await service.GetById(1);

        //    Assert.NotNull(passage);
        //}

        //[Fact]
        //public async Task TestBaseServiceDbDelte_ShouldDeleteAsync()
        //{
        //    WikiPassageService service = new WikiPassageService();
        //    await service.AddAsync(BuildOneEntity(),1);

        //    WikiPassage passageToFind = await service.GetById(1);

        //    await service.DeleteByIdAsync(1);
        //    WikiPassage passage = await service.GetById(1);

        //    Assert.NotNull(passageToFind);
        //    Assert.Null(passage);
        //}

        //[Fact]
        //public async Task TestBaseServiceDbUpdate_ShouldUpdate()
        //{
        //    WikiPassageService service = new WikiPassageService();
        //    await service.AddAsync(BuildOneEntity(),1);

        //    WikiPassage passage = await service.GetById(1);
        //    passage.Content = "这是修改后的内容";

        //    await service.UpdateAsync(passage);
        //    Assert.True((await service.GetById(1)).Content == "这是修改后的内容");
        //}

        private WikiPassage BuildOneEntity()
        {
            WikiPassage passage = new WikiPassage();
            passage.Title = "功能介绍";
            passage.Content = "这是第一篇维基内容";
            passage.CreateDate = DateTime.Now;
            passage.LastModifyDate = DateTime.Now;

            return passage;
        }
    }
}
