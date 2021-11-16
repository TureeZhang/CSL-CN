using System;
using HanJie.CSLCN.Models.DataModels;

namespace HanJie.CSLCN.Models.Dtos
{
    public class UserInfoAuditDto : BaseDtoModel<UserInfoAuditDto, UserInfoAudit>
    {
        public int UserId { get; set; }
        public string NickName { get; set; }
        public string AvatarUrl { get; set; }
        public string PersonalHomepageUrl { get; set; }
        public string PersonalizedSignature { get; set; }
    }
}
