using HanJie.CSLCN.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class WikiPassageDto : BaseDtoModel<WikiPassageDto, WikiPassage>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string RoutePath { get; set; }
        public List<WikiPassageAnchorTitleDto> AnchorTitles { get; set; }
        public UserInfoDto LastModifyUser { get; set; }
        public List<UserInfoDto> MainAuthors { get; set; }
        public List<UserInfoDto> CoAuthors { get; set; }
        public int CategoryId { get; set; }
        public string CategoryUrl { get; set; }
        public List<BreadCrumbDto> BreadCrumbs { get; set; }
        public UserInfoDto EditingUser { get; set; }
        public int TotalViewsCount { get; set; }
    }
}
