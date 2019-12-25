using HanJie.CSLCN.Models.DataModels;
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
    }
}
