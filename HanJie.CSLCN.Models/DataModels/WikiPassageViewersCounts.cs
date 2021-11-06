using System;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Models.DataModels
{
    public class WikiPassageViewersCounts : BaseDataModel<WikiPassageViewersCounts,WikiPassageViewersCountsDto>
    {
        public int WikiPassageId { get; set; }
        public int ViewersCount { get; set; }
    }
}
