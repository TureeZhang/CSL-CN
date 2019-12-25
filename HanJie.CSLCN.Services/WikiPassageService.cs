using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class WikiPassageService : BaseService<WikiPassageDto, WikiPassage>
    {
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
    }
}
