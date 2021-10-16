using System;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public class PageViewersCountService : BaseService<WikiPassageDto, WikiPassage>
    {
        public PageViewersCountService(IWikiPassageService wikiPassageService, CSLDbContext cslDbContext, ICommonHelper commonHelper)
            : base(cslDbContext, commonHelper)
        {

        }





    }
}
