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

        public int WikiPassageId { get; set; }

        public int UserId { get; set; }

        public AuditStatusEnum AuditStatus { get; set; }

        public string AuditRejectReason { get; set; }

        /// <summary>
        /// 这是回复哪一条评论的（方便后续识别对话功能，首版评论不实现。顶层评论没有这个值）
        /// </summary>
        public int? ReplyTo { get; set; }
    }
}
