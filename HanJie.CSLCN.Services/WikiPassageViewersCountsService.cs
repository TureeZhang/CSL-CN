using System;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public class WikiPassageViewersCountsService : BaseService<WikiPassageViewersCountsDto, WikiPassageViewersCounts>,IWikiPassageViewersCountsService
    {
        public WikiPassageViewersCountsService(CSLDbContext cslDbContext,ICommonHelper commonHelper)
            :base(cslDbContext,commonHelper)
        {

        }

        public WikiPassageViewersCounts GetByWikiPassageId(int wikiPassageId)
        {
            Ensure.IsDatabaseId(wikiPassageId, nameof(wikiPassageId));

            WikiPassageViewersCounts result = base.CSLDbContext.WikiPassageViewersCounts.Where(item => item.WikiPassageId == wikiPassageId).FirstOrDefault();
            return result;
        }

        public void UpdateViewersCounts(int id,int newViewersCount)
        {
            Ensure.MoreThan(newViewersCount, 0, nameof(newViewersCount));

            WikiPassageViewersCounts data = GetById(id);
            data.ViewersCount += newViewersCount;
            base.Update(data);
        }
    }
}
