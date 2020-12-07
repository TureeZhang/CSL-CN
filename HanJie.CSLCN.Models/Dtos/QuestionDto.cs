using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class QuestionDto:BaseDtoModel<QuestionDto,Question>
    {
        public string Title { get; set; }

        public UserInfoDto CreateUser { get; set; }

        public string Content { get; set; }

        public QuestionStatusEnum Status { get; set; }

        public int AuditorUserId { get; set; }

        public string AuditRejectedReason { get; set; }
    }
}
