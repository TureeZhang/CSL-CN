using System;
using System.ComponentModel.DataAnnotations.Schema;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Models.DataModels
{
    [Table("userinfoesaudits")]
    public class UserInfoAudit : BaseUserInfo<UserInfoAudit, UserInfoAuditDto>
    {
        public UserInfoAudit()
        {
        }
    }
}
