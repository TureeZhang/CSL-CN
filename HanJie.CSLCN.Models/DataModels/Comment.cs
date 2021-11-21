using System;
using System.ComponentModel.DataAnnotations;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;

namespace HanJie.CSLCN.Models.DataModels
{
    public class WikiPassageComment : BaseDataModel<WikiPassageComment,WikiPassageCommentDto>
    {

        [Required]
        public string Content { get; set; }

        public WikiPassage WikiPassage { get; set; }

        [Required]
        public UserInfo User { get; set; }

        public AuditStatusEnum AuditStatus { get; set; }

        public string AuditRejectReason { get; set; }
    }
}
