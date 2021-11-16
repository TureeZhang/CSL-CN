using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class UserInfo : BaseDataModel<UserInfo, UserInfoDto>
    {
        /// <summary>
        /// 用户名
        /// </summary>
        [Required]
        [MaxLength(16)]
        public string UserName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        [Required]
        [MaxLength(64)]
        public string Password { get; set; }

        /// <summary>
        /// 昵称
        /// </summary>
        [Required]
        [StringLength(24)]
        public string NickName { get; set; }

        /// <summary>
        /// 是否为管理员
        /// </summary>
        [Required]
        public bool IsAdmin { get; set; }

        /// <summary>
        /// 用户头像地址
        /// </summary>
        public string AvatarUrl { get; set; }

        /// <summary>
        /// 个人主页地址
        /// </summary>
        public string PersonalHomepageUrl { get; set; }

        /// <summary>
        /// 个人头衔
        /// </summary>
        public string PersonalTitle { get; set; }

        /// <summary>
        /// 捐赠描述
        /// </summary>
        public string DescriptionWord { get; set; }

        /// <summary>
        /// 个性签名
        /// </summary>
        public string PersonalizedSignature { get; set; }

        /// <summary>
        /// 提交次数计数
        /// </summary>
        public int CommitTimesCount { get; set; }

        /// <summary>
        /// 最后编辑文档的时间（最后活跃时间）
        /// </summary>
        public DateTime? LastCommitDateTime { get; set; }

        /// <summary>
        /// 手机号码
        /// </summary>
        [MaxLength(64)]
        public string PhoneNumber { get; set; }

        /// <summary>
        /// 审核状态
        /// </summary>
        public AuditStatusEnum AuditStatus { get; set; }

        /// <summary>
        /// 审核拒绝原因
        /// </summary>
        public string AuditRejectedReason { get; set; }
    }
}
