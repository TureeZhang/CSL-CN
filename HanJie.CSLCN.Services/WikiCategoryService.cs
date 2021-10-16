using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class WikiCategoryService : BaseService<WikiCategoryDto, WikiCategory>, IWikiCategoryService
    {
        public WikiCategoryService(CSLDbContext cslDbContext, ICommonHelper commonHelper)
            : base(cslDbContext, commonHelper)
        {

        }

        Task<WikiCategory> IWikiCategoryService.GetById(int categoryId)
        {
            Ensure.NotNull(categoryId, nameof(categoryId));

            return base.GetById(categoryId);
        }
    }
}