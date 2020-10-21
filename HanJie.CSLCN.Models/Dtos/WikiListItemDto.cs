using HanJie.CSLCN.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class WikiListItemDto : BaseDtoModel<WikiListItemDto, WikiPassage>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string RoutePath { get; set; }
        public string CoverUrl { get; set; }
        public UserInfoDto LastModifyUser { get; set; }
        public int TotalViewsCount { get; set; }
    }
}
