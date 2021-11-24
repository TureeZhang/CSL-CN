using System;
using AutoMapper;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Common.MapperProfile
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            base.CreateMap<UserInfoDto, UserInfo>();
            base.CreateMap<UserInfo, UserInfoDto>();
        }
    }
}
