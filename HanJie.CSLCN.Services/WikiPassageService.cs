using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Dtos.Normals;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class WikiPassageService : BaseService<WikiPassageDto, WikiPassage>
    {
        private UserInfoService _userInfoService;
        private static Dictionary<int, WikiPassageLockingInfo> WikiEditingStatusDictionary = new Dictionary<int, WikiPassageLockingInfo>();
        private object _editingStatusLock = new object();

        #region 访问量统计
        private static Dictionary<int, Dictionary<string, ViewsCountDto>> ViewsDictionary = new Dictionary<int, Dictionary<string, ViewsCountDto>>();
        private static object _viewsCountDictionaryLock = new object();
        #endregion

        public WikiPassageService()
        {

        }

        public async Task<WikiPassage> GetByRoutePathAsync(string routePath)
        {
            if (string.IsNullOrEmpty(routePath))
                throw new ArgumentException("路由地址是必须的", nameof(routePath));

            WikiPassage wikiPassage = await CSLDbContext.WikiPassages.Where(wp => string.Equals(routePath, wp.RoutePath, StringComparison.OrdinalIgnoreCase)).AsNoTracking().FirstOrDefaultAsync();
            return wikiPassage;
        }

        public async Task<List<WikiPassageAnchorTitleDto>> CollectAnchorTitlesAsync(string content)
        {
            if (string.IsNullOrEmpty(content))
                throw new ArgumentNullException(nameof(content), "content is required.");

            List<WikiPassageAnchorTitleDto> result = new List<WikiPassageAnchorTitleDto>();
            StringReader stringReader = new StringReader(content);
            string line = await stringReader.ReadLineAsync();

            try
            {
                //当文档中跨级出现越级标题时，此处尚不能实现容错。暂时取消生成滚动侦测目录
                while (line != null)
                {
                    if (line.StartsWith("## "))
                        result.Add(new WikiPassageAnchorTitleDto() { Title = line.Substring(3), Href = $"#{line.Substring(3).Replace(" ", "-").Replace("&", "")}" });
                    else if (line.StartsWith("### "))
                    {
                        if (result.Last().Children == null)
                        {
                            result.Last().Children = new List<WikiPassageAnchorTitleDto>();
                        }
                        result.Last().Children.Add(new WikiPassageAnchorTitleDto() { Title = line.Substring(4), Href = $"#{line.Substring(4).Replace(" ", "-").Replace("&", "")}" });
                    }
                    else
                    {
                        //do nothing here;
                    }

                    line = await stringReader.ReadLineAsync();
                }
            }
            catch (Exception)
            {
                //do nothing here.
            }

            return result;
        }

        public virtual async Task<List<BreadCrumbDto>> CollectChildPageBreadCrumbs(WikiPassageDto wikiPassageDto)
        {
            List<BreadCrumbDto> results = new List<BreadCrumbDto>();
            List<WikiPassage> childPassages = await this.CSLDbContext.WikiPassages.Where(item => item.ParentPassageId == wikiPassageDto.Id).ToListAsync();
            foreach (WikiPassage item in childPassages)
            {
                BreadCrumbDto breadCrumbDto = new BreadCrumbDto { Name = item.Title, Url = item.RoutePath };
                results.Add(breadCrumbDto);
            }

            return results;
        }

        public virtual List<BreadCrumbDto> CollectBreadCrumbs(WikiPassageDto wikiPassageDto)
        {
            Ensure.NotNull(wikiPassageDto, nameof(wikiPassageDto));

            List<BreadCrumbDto> results = new List<BreadCrumbDto>();
            List<BreadCrumbDto> parents = new List<BreadCrumbDto>();
            while (true)
            {
                WikiPassage parentPassage = base.GetById(wikiPassageDto.ParentPassageId);
                parents.Add(new BreadCrumbDto { Name = parentPassage.Title, Url = $"/wiki-passage/{parentPassage.RoutePath}" });

                if (parentPassage.ParentPassageId == 0)
                {
                    break;
                }
            }

            for (int i = parents.Count - 1; i >= 0; i--)
            {
                results.Add(parents[i]);
            }

            return results;
        }

        public virtual async Task<bool> IsRoutePathExist(string routePath)
        {
            Ensure.NotNull(routePath, nameof(routePath));

            WikiPassage wikiPassage = await GetByRoutePathAsync(routePath);
            bool isExist = wikiPassage != null;
            return isExist;
        }

        public virtual async Task UpdateAsync(WikiPassageDto wikiPassageDto, int currentUserId)
        {
            Ensure.NotNull(wikiPassageDto, nameof(wikiPassageDto));
            Ensure.NotNull(wikiPassageDto.EditingUser, nameof(wikiPassageDto.EditingUser));
            Ensure.NotNull(currentUserId, nameof(currentUserId));

            if (!IsCurrentUserEditing(wikiPassageDto.Id, currentUserId))
                throw new UnauthorizedAccessException($"当前用户 UserId:{currentUserId} 不是此文档 passageId:{wikiPassageDto.Id} 的编辑者，无权更新文档。");

            WikiPassage entity = new WikiPassage().ConvertFromDtoModel(wikiPassageDto);
            entity.MainAuthors = string.Join(",", wikiPassageDto.MainAuthors.Select(item => item.Id).ToArray());

            if (wikiPassageDto.CoAuthors != null)
                entity.CoAuthors = string.Join(",", wikiPassageDto.CoAuthors?.Select(item => item.Id).ToArray());

            await base.UpdateAsync(entity);
            UnlockPassageEditingStatus(wikiPassageDto.Id);
        }

        public virtual async Task<WikiPassage> Create(WikiPassageDto wikiPassageDto)
        {
            Ensure.NotNull(wikiPassageDto, nameof(wikiPassageDto));
            Ensure.NotNull(wikiPassageDto.Title, nameof(wikiPassageDto.Title));
            Ensure.NotNull(wikiPassageDto.RoutePath, nameof(wikiPassageDto.RoutePath));

            if ((await GetByRoutePathAsync(wikiPassageDto.RoutePath)) != null)
                throw new ArgumentException($"指定的路径名称已存在：{wikiPassageDto.RoutePath}");

            wikiPassageDto.Content = "施工中🚧";
            WikiPassage entity = new WikiPassage().ConvertFromDtoModel(wikiPassageDto);
            entity.MainAuthors = wikiPassageDto.MainAuthors.FirstOrDefault()?.Id.ToString();
            WikiPassage wikiPassage = await base.AddAsync(entity);

            return wikiPassage;
        }

        #region 锁定编辑状态

        public bool LockPassageEditingStatus(int passageId, int applyToLockPassageUserId)
        {
            Ensure.IsDatabaseId(passageId, nameof(passageId));
            Ensure.IsDatabaseId(applyToLockPassageUserId, nameof(applyToLockPassageUserId));

            lock (this._editingStatusLock)
            {
                //文章已锁定，且不是当前用户锁定，则返回锁定失败
                if (WikiPassageService.WikiEditingStatusDictionary.ContainsKey(passageId)
                     && WikiPassageService.WikiEditingStatusDictionary[passageId].UserId != applyToLockPassageUserId)
                    return false;

                //已被当前用户锁定后再次发起锁定请求，则更新锁定时间
                if (WikiPassageService.WikiEditingStatusDictionary.ContainsKey(passageId)
                    && WikiPassageService.WikiEditingStatusDictionary[passageId].UserId == applyToLockPassageUserId)
                {
                    WikiEditingStatusDictionary[passageId].LastLockingConfirmDateTime = DateTime.Now;
                    return true;
                }

                //否则执行初次锁定
                WikiPassageLockingInfo wikiPassageLockingInfo = new WikiPassageLockingInfo();
                wikiPassageLockingInfo.UserId = applyToLockPassageUserId;
                wikiPassageLockingInfo.LastLockingConfirmDateTime = DateTime.Now;
                WikiPassageService.WikiEditingStatusDictionary.Add(passageId, wikiPassageLockingInfo);
                return true;
            }
        }

        public void UnlockPassageEditingStatus(int passageId)
        {
            lock (this._editingStatusLock)
            {
                if (!WikiPassageService.WikiEditingStatusDictionary.ContainsKey(passageId))
                    return;

                WikiPassageService.WikiEditingStatusDictionary.Remove(passageId);
            }
        }

        public bool IsPassageLocked(int passageId)
        {
            lock (this._editingStatusLock)
            {

                Ensure.IsDatabaseId(passageId, nameof(passageId));

                if (!WikiPassageService.WikiEditingStatusDictionary.ContainsKey(passageId))
                    return false;

                WikiPassageLockingInfo lockingInfo = WikiPassageService.WikiEditingStatusDictionary[passageId];
                if (lockingInfo.LastLockingConfirmDateTime.AddMinutes(1) < DateTime.Now)
                {
                    UnlockPassageEditingStatus(passageId);
                    return false;
                }

                return true;
            }
        }

        public bool IsCurrentUserEditing(int passageId, int currentUserId)
        {
            Ensure.IsDatabaseId(passageId, nameof(passageId));
            Ensure.IsDatabaseId(currentUserId, nameof(currentUserId));

            if (!WikiPassageService.WikiEditingStatusDictionary.ContainsKey(passageId))
                return false;

            if (WikiEditingStatusDictionary[passageId].UserId != currentUserId)
                return false;

            return true;
        }

        public int GetEditingUserId(int passageId)
        {
            Ensure.IsDatabaseId(passageId, nameof(passageId));

            //为便利测试， Id=1 的文档持续在 Debug 环境中会被 UserId=1 一直锁定
            if (RunAs.Debug && passageId == 1)
            {
                LockPassageEditingStatus(1, 1);
                return 1;
            }

            if (IsPassageLocked(passageId))
                return WikiPassageService.WikiEditingStatusDictionary[passageId].UserId;

            return 0;
        }

        #endregion



        public virtual async Task<string> PickCoverUrlFromContentFirstImage(string content)
        {
            string result = "./assets/logo-header.png";

            if (string.IsNullOrEmpty(content))
                return result;

            StringReader stringReader = new StringReader(content);
            string line = await stringReader.ReadLineAsync();
            while (line != null)
            {
                if (line.Trim().StartsWith("!["))
                {
                    result = line.Split(new char[] { '(' }, StringSplitOptions.RemoveEmptyEntries).LastOrDefault().Replace(")", "");
                    break;
                }

                line = await stringReader.ReadLineAsync();
            }

            return result;
        }

        #region 访问量统计
        public void AddViewsCount(int passageId, IPAddress ip)
        {
            Ensure.IsDatabaseId(passageId, nameof(passageId));
            Ensure.NotNull(ip, nameof(ip));

            string ipAddress = ip.ToString();
            LockViewsDictionary(dic =>
            {
                if (!dic.ContainsKey(passageId))
                    dic.Add(passageId, new Dictionary<string, ViewsCountDto>());

                if (dic[passageId].ContainsKey(ipAddress))
                {
                    DateTime lastUpdateTime = dic[passageId][ipAddress].LastUpdateTime;
                    if (lastUpdateTime.AddMinutes(5) < DateTime.Now)
                    {
                        dic[passageId][ipAddress].NewViews += 1;
                        dic[passageId][ipAddress].LastUpdateTime = DateTime.Now;
                    }
                }
                else
                {
                    ViewsCountDto viewsCountDto = new ViewsCountDto();
                    viewsCountDto.NewViews = 1;
                    viewsCountDto.LastUpdateTime = DateTime.Now;
                    dic[passageId].Add(ipAddress, viewsCountDto);
                }

            });
        }

        public static void StartViewsCountUpdateTask(WikiPassageService wikiPassageService)
        {
            while (true)
            {
                Task task = Task.Run(() =>
                 {
                     LockViewsDictionary(async dic =>
                     {
                         foreach (KeyValuePair<int, Dictionary<string, ViewsCountDto>> item in dic)
                         {
                             int passageId = item.Key;
                             int newViewsCount = item.Value.Select(viewsCountDto => viewsCountDto.Value.NewViews).ToList().Sum();

                             if (newViewsCount > 0)
                             {
                                 WikiPassage wikiPassage = wikiPassageService.GetById(passageId);
                                 wikiPassage.TotalViewsCount += newViewsCount;
                                 await wikiPassageService.UpdateAsync(wikiPassage);
                             }
                         }
                         foreach (KeyValuePair<int, Dictionary<string, ViewsCountDto>> passageViewsDictionary in dic)
                         {
                             foreach (KeyValuePair<string, ViewsCountDto> viewsCountItem in passageViewsDictionary.Value)
                             {
                                 viewsCountItem.Value.NewViews = 0;
                             }
                         }
                     });
                 });
                task.GetAwaiter().OnCompleted(() =>
                {
                    if (RunAs.Debug)
                        Thread.Sleep(5000);
                    if (RunAs.Release)
                        Thread.Sleep(30000);
                });
            }
        }

        public static void LockViewsDictionary(Action<Dictionary<int, Dictionary<string, ViewsCountDto>>> action)
        {
            lock (_viewsCountDictionaryLock)
            {
                action(WikiPassageService.ViewsDictionary);
            }
        }
        #endregion

    }
}
