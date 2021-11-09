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
            base.CreateMap<UserInfoDto, UserInfo>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Password, opt => opt.MapFrom(s => s.Password))
                .ForMember(d => d.NickName, opt => opt.MapFrom(s => s.NickName))
                .ForMember(d => d.AvatarUrl, opt => opt.MapFrom(s => s.AvatarUrl))
                .ForMember(d => d.PersonalHomepageUrl, opt => opt.MapFrom(s => s.PersonalHomepageUrl))
                .ForMember(d => d.PersonalTitle, opt => opt.MapFrom(s => s.PersonalTitle))
                .ForMember(d => d.PersonalizedSignature, opt => opt.MapFrom(s => s.PersonalizedSignature));
        }
    }
}
