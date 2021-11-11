﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Models.DataModels
{

    [Table("userinfoes")]
    public class UserInfo:BaseUserInfo<UserInfo,UserInfoDto>
    {
        public UserInfo()
        {
        }
    }
}
