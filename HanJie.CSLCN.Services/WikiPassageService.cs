using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Dtos.Normals;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace HanJie.CSLCN.Services
{
    public class WikiPassageService : BaseService<WikiPassageDto, WikiPassage>
    {
        private static Dictionary<int, WikiPassageLockingInfo> WikiEditingStatusDictionary = new Dictionary<int, WikiPassageLockingInfo>();
        private object _editingStatusLock = new object();

        public static Tuple<DateTime, List<WikiListItemDto>> WikiListCaches { get; private set; }

        #region 访问量统计
        private RedisService _redisService;
        private static Dictionary<int, Dictionary<string, ViewsCountDto>> ViewsDictionary => GetViewsDictionaryCache().Result;

        private static Task viewsCountTask;
        /// <summary>
        /// 对访问量缓存对象的保护锁
        /// </summary>
        private static object _viewsCountDictionaryLock = new object();
        #endregion

        public WikiPassageService()
        {
            this._redisService = GlobalService.ServiceProvider.GetService<RedisService>();
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
                int codeTagCount = 0;

                //当文档中跨级出现越级标题时，此处尚不能实现容错。暂时取消生成滚动侦测目录
                while (line != null)
                {

                    if (line.StartsWith("```") || line.StartsWith("~~~"))
                        codeTagCount++;

                    if (codeTagCount % 2 == 1)
                    {
                        line = await stringReader.ReadLineAsync();
                        continue;
                    }

                    if (line.StartsWith("## "))
                        result.Add(new WikiPassageAnchorTitleDto() { Title = line.Substring(3), Href = $"#{line.Substring(3).Replace(" ", "-").Replace("&", "").ToLower()}" });
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

        /// 列出所有文章的概述。
        /// 
        /// 注意：
        ///     包含文章标题、概述、封面图链接等。
        /// <param name="isContainLastModifyUserInfo">是否包含文章的作者信息</param>
        /// <param name="neverReadFromCache">是否立即从数据库中执行统计。设置为 false，则自动按照缓存策略决定返回的数据来自于缓存还是数据库。</param>
        /// <returns></returns>
        public virtual async Task<List<WikiListItemDto>> ListAllPassageGenerals(bool readFromDatabaseImmediately = false)
        {
            if (!readFromDatabaseImmediately)
            {
                if (WikiListCaches != null && WikiListCaches.Item1.AddMinutes(5) > DateTime.Now)
                    return WikiListCaches.Item2;
            }

            List<WikiPassage> wikiPassageDtos = await ListAsync();
            List<WikiListItemDto> wikiListItems = new List<WikiListItemDto>();
            foreach (WikiPassage item in wikiPassageDtos)
            {
                wikiListItems.Add(await CovertToWikiListModel(item));
            }

            //Cache
            WikiPassageService.WikiListCaches = new Tuple<DateTime, List<WikiListItemDto>>(DateTime.Now, wikiListItems);

            return wikiListItems;
        }

        public async Task<List<WikiListItemDto>> ListCategoriesAsync(int categoryId)
        {
            Ensure.IsDatabaseId(categoryId, nameof(categoryId));

            List<WikiListItemDto> results = new List<WikiListItemDto>();
            List<WikiPassage> wikiPassages = base.ListWhereAsync(item => item.CategoryId == categoryId);
            foreach (WikiPassage item in wikiPassages)
            {
                results.Add(await CovertToWikiListModel(item));
            }

            return results;
        }

        private async Task<WikiListItemDto> CovertToWikiListModel(WikiPassage wikiPassage)
        {
            WikiListItemDto dto = new WikiListItemDto();
            dto.Id = wikiPassage.Id;
            dto.Title = wikiPassage.Title;
            dto.Description = await PickDescriptionFromContent(wikiPassage.Content);
            dto.RoutePath = wikiPassage.RoutePath;
            dto.CoverUrl = await PickCoverUrlFromContentFirstImage(wikiPassage.Content);
            dto.LastModifyDate = wikiPassage.LastModifyDate.ToString("yyyy-MM-dd HH:mm:ss");
            dto.LastModifyUser = new UserInfoDto { Id = wikiPassage.LastModifyUserId };

            return dto;
        }

        public virtual async Task<List<BreadCrumbDto>> CollectBreadCrumbsAsync(WikiPassageDto wikiPassageDto)
        {
            Ensure.NotNull(wikiPassageDto, nameof(wikiPassageDto));

            List<BreadCrumbDto> results = new List<BreadCrumbDto>();
            WikiCategoryService wikiCategoryService = base.GetService<WikiCategoryService>();
            WikiCategory wikiCategory = await wikiCategoryService.GetById(wikiPassageDto.CategoryId);
            results.Add(new BreadCrumbDto { Name = wikiCategory.Name, Url = "/wiki-list" });//$"/wiki-passage/{parentPassage.RoutePath}"

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

            //
            //提供内容的用户即视为共同编辑者

            List<string> mainAuthors = entity.MainAuthors?.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries)?.ToList();
            List<string> existCoAuthors = entity.CoAuthors?.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries)?.ToList();
            if (!mainAuthors.Contains(currentUserId.ToString()))
            {
                if (existCoAuthors == null)
                    existCoAuthors = new List<string>();

                if (!existCoAuthors.Contains(currentUserId.ToString()))
                {
                    existCoAuthors.Add(currentUserId.ToString());
                    entity.CoAuthors = string.Join(",", existCoAuthors);
                }
            }

            entity.LastModifyUserId = currentUserId;

            await base.UpdateAsync(entity);
            UnlockPassageEditingStatus(wikiPassageDto.Id);
        }

        public virtual async Task<WikiPassage> Create(WikiPassageDto wikiPassageDto)
        {
            Ensure.NotNull(wikiPassageDto, nameof(wikiPassageDto));
            Ensure.NotNull(wikiPassageDto.Title, nameof(wikiPassageDto.Title));

            if (string.IsNullOrEmpty(wikiPassageDto.RoutePath))
            {
                wikiPassageDto.RoutePath = Guid.NewGuid().ToString("n");
            }
            else
            {
                if ((await GetByRoutePathAsync(wikiPassageDto.RoutePath)) != null)
                    throw new ArgumentException($"指定的路径名称已存在：{wikiPassageDto.RoutePath}");
            }

            wikiPassageDto.Content = "施工中🚧";
            WikiPassage entity = new WikiPassage().ConvertFromDtoModel(wikiPassageDto);
            entity.MainAuthors = wikiPassageDto.MainAuthors.FirstOrDefault()?.Id.ToString();
            entity.LastModifyUserId = wikiPassageDto.LastModifyUser == null ? wikiPassageDto.MainAuthors.First().Id : wikiPassageDto.LastModifyUser.Id;
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


        public virtual async Task<string> PickDescriptionFromContent(string content)
        {
            Ensure.NotNull(content, nameof(content));

            string result = "编辑中...";

            if (!content.Trim().StartsWith("!["))
            {
                result = content.Substring(0, content.Length < 32 ? content.Length : 32);
                return result;
            }

            StringReader contentReader = new StringReader(content);
            string line = await contentReader.ReadLineAsync();
            while (line != null)
            {
                if (!line.Trim().StartsWith("![") && line.Trim() != string.Empty)
                {
                    result = line.Substring(0, line.Length < 32 ? line.Length : 32);
                    break;
                }

                line = await contentReader.ReadLineAsync();
            }

            return result;
        }


        #region 访问量统计
        private static async Task<Dictionary<int, Dictionary<string, ViewsCountDto>>> GetViewsDictionaryCache()
        {
            RedisService redisService = GlobalService.ServiceProvider.GetService<RedisService>();
            Dictionary<int, Dictionary<string, ViewsCountDto>> result = redisService.ObjectGet<Dictionary<int, Dictionary<string, ViewsCountDto>>>(StringConsts.ViewsCountDictionary);

            if (result == null)
            {
                result = new Dictionary<int, Dictionary<string, ViewsCountDto>>();
                await redisService.ObjectSetAsync(StringConsts.ViewsCountDictionary, result);
            }

            return result;
        }
        public void AddViewsCount(int passageId, IPAddress ip)
        {
            try
            {
                Ensure.IsDatabaseId(passageId, nameof(passageId));
                Ensure.NotNull(ip, nameof(ip));

                string ipAddress = ip.ToString();

                LockViewsDictionary(dic =>
                {
                    if (!dic.ContainsKey(passageId))
                    {
                        dic.Add(passageId, new Dictionary<string, ViewsCountDto>());
                    }

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
                    this._redisService.ObjectSetAsync(StringConsts.ViewsCountDictionary, dic).GetAwaiter();

                });
            }
            catch (Exception ex)
            {
                base.Log(message: "访问量统计：新增访问量出现异常。",
                    parameters: new { ex = ex.ToString(), passageId, ip = ip.ToString() });
            }
        }

        public static void StartViewsCountUpdateTask(WikiPassageService wikiPassageService)
        {
            try
            {

                Ensure.NotNull(wikiPassageService, nameof(wikiPassageService));

                if (WikiPassageService.viewsCountTask != null)
                {
                    return;
                }

                WikiPassageService.viewsCountTask = Task.Run(() =>
                 {
                     while (true)
                     {
                         try
                         {

                             LockViewsDictionary(async dic =>
                             {
                                 foreach (KeyValuePair<int, Dictionary<string, ViewsCountDto>> item in dic)
                                 {
                                     int passageId = item.Key;
                                     int newViewsCount = item.Value.Select(viewsCountDto => viewsCountDto.Value.NewViews).ToList().Sum();

                                     if (newViewsCount > 0)
                                     {
                                         WikiPassage wikiPassage = await wikiPassageService.GetById(passageId);
                                         wikiPassage.TotalViewsCount += newViewsCount;
                                         _ = wikiPassageService.UpdateAsync(wikiPassage, false);
                                     }
                                 }
                                 foreach (KeyValuePair<int, Dictionary<string, ViewsCountDto>> passageViewsDictionary in dic)
                                 {
                                     foreach (KeyValuePair<string, ViewsCountDto> viewsCountItem in passageViewsDictionary.Value)
                                     {
                                         viewsCountItem.Value.NewViews = 0;
                                     }
                                 }
                                 _ = GlobalService.ServiceProvider.GetService<RedisService>().ObjectSetAsync(StringConsts.ViewsCountDictionary, dic);
                             });
                             if (RunAs.Debug)
                             {
                                 Thread.Sleep(5 * 1000);    //5秒
                             }
                             if (RunAs.Release)
                             {
                                 File.AppendAllText("counter-log.txt", DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "counter lifecycle once complete, sleep point checke." + Environment.NewLine);
                                 Thread.Sleep(20 * 1000);  //20秒
                             }
                         }
                         catch (Exception ex)
                         {
                             File.AppendAllText("counter-log.txt", DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "counter catch ex inside task: " + Environment.NewLine + ex.ToString());
                         }
                     }
                 });
            }
            catch (Exception ex)
            {
                File.AppendAllText("counter-log.txt", DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + "ex:" + ex.ToString() + Environment.NewLine);
                new LogService().Log(message: "访问量统计：启动访问量统计系统前出错",
                         parameters: new { ex = ex.ToString(), wikiPassageService = wikiPassageService.ToString() });
            }

        }

        /// <summary>
        /// 锁定保护，防止两个冲突的进程同时访问 Dictionary 
        /// </summary>
        /// <param name="action"></param>
        public static void LockViewsDictionary(Action<Dictionary<int, Dictionary<string, ViewsCountDto>>> action)
        {
            //此锁锁定 新增访问量 与 结算访问量 同时访问的情况，保护 ViewsDictionary 唯一性
            lock (WikiPassageService._viewsCountDictionaryLock)
            {
                action(ViewsDictionary);
            }
        }
        #endregion

        #region 文档贡献者列表

        public virtual async Task<List<WikiPassage>> ListAsMainAuthorPassages(int userId)
        {
            Ensure.IsDatabaseId(userId, nameof(userId));

            //item => 

            List<WikiPassage> results = new List<WikiPassage>();
            var datas = await CSLDbContext.WikiPassages.Select(item => new { item.Id, item.RoutePath, item.Title, item.MainAuthors }).ToListAsync();
            datas = datas.Where(item => item.MainAuthors == null ? false : item.MainAuthors.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Contains(userId.ToString())).ToList();

            foreach (var item in datas)
            {
                WikiPassage wikiPassage = new WikiPassage();
                wikiPassage.Id = item.Id;
                wikiPassage.RoutePath = item.RoutePath;
                wikiPassage.Title = item.Title;
                results.Add(wikiPassage);
            }

            return results;
        }

        public virtual async Task<List<WikiPassageDto>> ListAsMainAuthorPassageDtoes(int userId)
        {
            return ConvertToDtos(await ListAsMainAuthorPassages(userId));
        }

        public virtual async Task<List<WikiPassage>> ListAsCooperatePassages(int userId)
        {
            Ensure.IsDatabaseId(userId, nameof(userId));

            List<WikiPassage> results = new List<WikiPassage>();
            var datas = await CSLDbContext.WikiPassages.Select(item => new { item.Id, item.RoutePath, item.Title, item.CoAuthors }).ToListAsync();
            datas = datas.Where(item => item.CoAuthors == null ? false : item.CoAuthors.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Contains(userId.ToString())).ToList();

            foreach (var item in datas)
            {
                WikiPassage wikiPassage = new WikiPassage();
                wikiPassage.Id = item.Id;
                wikiPassage.RoutePath = item.RoutePath;
                wikiPassage.Title = item.Title;
                results.Add(wikiPassage);

            }

            return results;
        }

        public virtual async Task<List<WikiPassageDto>> ListAsCooperatePassageDtoes(int userId)
        {
            return ConvertToDtos(await ListAsCooperatePassages(userId));
        }

        private List<WikiPassageDto> ConvertToDtos(List<WikiPassage> list)
        {
            Ensure.NotNull(list, nameof(list));

            List<WikiPassageDto> wikiPassageDtos = new List<WikiPassageDto>();
            foreach (WikiPassage item in list)
            {
                WikiPassageDto dto = new WikiPassageDto().ConvertFromDataModel(item);
                dto.Content = null;
                wikiPassageDtos.Add(dto);
            }

            return wikiPassageDtos;
        }


        #endregion

        public Task<WikiPassage> AddAsync(WikiPassage data, int currentUserId)
        {
            Ensure.NotNull(data, nameof(data));
            Ensure.IsDatabaseId(currentUserId, nameof(currentUserId));

            data.MainAuthors = currentUserId.ToString();
            return base.AddAsync(data);
        }
    }
}
