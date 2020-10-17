using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class WikiCategory : BaseDataModel<WikiCategory, WikiCategoryDto>
    {
        public string Url { get; set; }
        public string Name { get; set; }
        public bool IsNameDisplay { get; set; }

    }
}
