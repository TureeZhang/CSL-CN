using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services.Providers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace HanJie.CSLCN.Services.BackgroundTasks
{
    public class ViewersCountTask : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private static Task _viewsCountTask;
        private IWikiPassageService _wikiPassageService;
        private IWikiPassageViewersCountsService _wikiPassageViewersCountsService;
        private ILogService _logService;
        private IRedisService _redisService;
        private IStaticDictionariesProvider _staticDictionariesProvider;

        public ViewersCountTask(IServiceProvider serviceProvider)
        {
            this._serviceProvider = serviceProvider;
        }

        protected async override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var scope = this._serviceProvider.CreateScope();

            this._wikiPassageService = scope.ServiceProvider.GetRequiredService<IWikiPassageService>();
            this._wikiPassageViewersCountsService = scope.ServiceProvider.GetRequiredService<IWikiPassageViewersCountsService>();
            this._logService = scope.ServiceProvider.GetRequiredService<ILogService>();
            this._redisService = scope.ServiceProvider.GetRequiredService<IRedisService>();
            this._staticDictionariesProvider = scope.ServiceProvider.GetRequiredService<IStaticDictionariesProvider>();

            await StartViewsCountUpdateTask();
        }


        public async Task StartViewsCountUpdateTask()
        {
            try
            {

                if (_viewsCountTask != null)
                {
                    return;
                }

                _viewsCountTask = Task.Run(() =>
                {
                    while (true)
                    {
                        this._wikiPassageService.LockViewsDictionary(async dic =>
                        {
                            foreach (KeyValuePair<int, Dictionary<string, ViewsCountDto>> item in dic)
                            {
                                int passageId = item.Key;
                                int newViewsCount = item.Value.Select(viewsCountDto => viewsCountDto.Value.NewViews).ToList().Sum();

                                if (newViewsCount > 0)
                                {
                                    WikiPassageViewersCounts viewersCounts = this._wikiPassageViewersCountsService.GetByWikiPassageId(passageId);
                                    viewersCounts.ViewersCount += newViewsCount;
                                    await this._wikiPassageViewersCountsService.UpdateAsync(viewersCounts);
                                }
                            }
                            foreach (KeyValuePair<int, Dictionary<string, ViewsCountDto>> passageViewsDictionary in dic)
                            {
                                foreach (KeyValuePair<string, ViewsCountDto> viewsCountItem in passageViewsDictionary.Value)
                                {
                                    viewsCountItem.Value.NewViews = 0;
                                }
                            }
                            await this._redisService.ObjectSetAsync(StringConsts.ViewsCountDictionary, dic);
                        });
                        if (RunAs.Debug)
                        {
                            Thread.Sleep(20 * 1000);    //5秒
                        }
                        if (RunAs.Release)
                        {
                            Thread.Sleep(60 * 1000);  //20秒
                        }
                    }
                });
            }
            catch (Exception ex)
            {
                await this._logService.Log(message: "访问量统计：启动访问量统计系统前出错",
                         parameters: new { ex = ex.ToString() });
            }

        }





    }
}
