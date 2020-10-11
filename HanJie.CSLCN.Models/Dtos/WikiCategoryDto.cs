using HanJie.CSLCN.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class WikiCategoryDto : BaseDtoModel<WikiCategoryDto, WikiCategory>
    {
        public string Url { get; set; }
        public string Name { get; set; }
        public bool IsNameDisplay { get; set; }
    }
}
