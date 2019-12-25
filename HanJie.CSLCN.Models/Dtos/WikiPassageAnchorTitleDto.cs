using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class WikiPassageAnchorTitleDto
    {
        public string Href { get; set; }
        public string Title { get; set; }
        public List<WikiPassageAnchorTitleDto> Children { get; set; }
    }
}
