using System;
using System.ComponentModel.DataAnnotations.Schema;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Models.DataModels
{
    public class UserInfoAudit : BaseDataModel<UserInfoAudit, UserInfoAuditDto>
    {
        public int UserId { get; set; }
        public string NickName { get; set; }
        public string AvatarUrl { get; set; }
        public string PersonalHomepageUrl { get; set; }
        public string PersonalizedSignature { get; set; }
        public string AuditRejectedReason { get; set; }
    }
}
