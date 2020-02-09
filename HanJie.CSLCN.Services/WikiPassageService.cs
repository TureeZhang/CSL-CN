using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class WikiPassageService : BaseService<WikiPassageDto, WikiPassage>
    {
        private UserInfoService _userInfoService;

        public WikiPassageService(UserInfoService userInfoService)
        {
            _userInfoService = userInfoService;
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

        public List<UserInfoDto> CollectAuthorInfoes(string[] userIds)
        {
            Ensure.NotNull(userIds, nameof(userIds));

            List<UserInfoDto> result = new List<UserInfoDto>();
            foreach (string item in userIds)
            {
                UserInfo userInfo = this._userInfoService.GetById(Convert.ToInt32(item));
                UserInfoDto dto = new UserInfoDto().ConvertFromDataModel(userInfo);
                result.Add(dto);
            }

            return result;
        }

        public virtual async Task UpdateAsync(WikiPassageDto data)
        {
            WikiPassage entity = new WikiPassage().ConvertFromDtoModel(data);
            entity.MainAuthors = string.Join(",", data.MainAuthors.Select(item => item.Id).ToArray());

            if (data.CoAuthors != null)
                entity.CoAuthors = string.Join(",", data.CoAuthors?.Select(item => item.Id).ToArray());

            await base.UpdateAsync(entity);
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

    }
}
