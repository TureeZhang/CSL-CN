using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class Question : BaseDataModel<Question, QuestionDto>
    {
        [Required]
        [StringLength(40)]
        public string Title { get; set; }

        [Required]
        public int CreateUserId { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public QuestionStatusEnum Status { get; set; }

        public int AuditorUserId { get; set; }

        public string AuditRejectedReason { get; set; }
    }

}
