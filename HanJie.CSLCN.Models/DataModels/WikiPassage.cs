using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class WikiPassage : BaseDataModel<WikiPassage, WikiPassageDto>
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public int LastModifyUserId { get; set; }

        [Required]
        public string MainAuthors { get; set; }

        public string CoAuthors { get; set; }

        [Required]
        public string RoutePath { get; set; }

        public int ParentPassageId { get; set; }

        [Required]
        public int TotalViewsCount { get; set; }
    }
}
