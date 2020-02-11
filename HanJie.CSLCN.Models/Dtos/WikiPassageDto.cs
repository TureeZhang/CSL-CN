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
        public List<UserInfoDto> MainAuthors { get; set; }
        public List<UserInfoDto> CoAuthors { get; set; }
        public int ParentPassageId { get; set; }
        public List<BreadCrumbDto> BreadCrumbs { get; set; }
        public List<BreadCrumbDto> ChildPageBreadCrumbs { get; set; }
        public UserInfoDto EditingUser { get; set; }
    }
}
