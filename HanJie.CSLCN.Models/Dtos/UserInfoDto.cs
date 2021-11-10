using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class UserInfoDto : BaseDtoModel<UserInfoDto, UserInfo>
    {
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// 昵称
        /// </summary>
        public string NickName { get; set; }

        /// <summary>
        /// 是否为管理员
        /// </summary>
        public bool IsAdmin { get; set; }

        /// <summary>
        /// 是否记住登录
        /// </summary>
        public bool Remember { get; set; }

        /// <summary>
        /// 是否成功登陆
        /// </summary>
        public bool IsLoginSuccess { get; set; }

        /// <summary>
        /// 用于当前登录用户状态标记的 Guid Cookie 值
        /// </summary>
        public string StatusMarkGuid { get; set; }

        /// <summary>
        /// 用户头像
        /// </summary>
        public string AvatarUrl { get; set; }

        /// <summary>
        /// 用户个人主页地址
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
        public string EditingUserId { get; set; }

        /// <summary>
        /// 个性签名
        /// </summary>
        public string PersonalizedSignature { get; set; }

        /// <summary>
        /// 提交次数计数
        /// </summary>
        public int CommitTimesCount { get; set; }

        /// <summary>
        /// 最后编辑的时间（最后活跃）
        /// </summary>
        public string LastCommitDateTime { get; set; }

        /// <summary>
        /// 手机号码
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// 手机号码前缀
        /// </summary>
        public string PhoneNumberPrefix { get; set; }

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
