using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    }
}
