using System;
using HanJie.CSLCN.Models.DataModels;

namespace HanJie.CSLCN.Models.Dtos
{
    public class WikiPassageViewersCountsDto:BaseDtoModel<WikiPassageViewersCountsDto,WikiPassageViewersCounts>
    {
        public int WikiPassageId { get; set; }
        public int ViewersCounts { get; set; }
    }
}
