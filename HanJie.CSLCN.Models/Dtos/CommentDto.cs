﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Enums;

namespace HanJie.CSLCN.Models.Dtos
{
    public class WikiPassageCommentDto : BaseDtoModel<WikiPassageCommentDto,WikiPassageComment>
    {
        public string Content { get; set; }

        public int WikiPassageId { get; set; }

        public UserInfoDto User { get; set; }

        public AuditStatusEnum AuditStatus { get; set; }

        public string AuditRejectReason { get; set; }
    }
}
