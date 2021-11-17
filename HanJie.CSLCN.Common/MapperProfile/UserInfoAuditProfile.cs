using System;
using AutoMapper;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Common.MapperProfile
{
    public class UserInfoAuditProfile : Profile
    {
        public UserInfoAuditProfile()
        {
            base.CreateMap<UserInfoAudit, UserInfoAuditDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.UserId, opt => opt.MapFrom(s => s.UserId))
                .ForMember(d => d.NickName, opt => opt.MapFrom(s => s.NickName))
                .ForMember(d => d.AvatarUrl, opt => opt.MapFrom(s => s.AvatarUrl))
                .ForMember(d => d.PersonalHomepageUrl, opt => opt.MapFrom(s => s.PersonalHomepageUrl))
                .ForMember(d => d.PersonalizedSignature, opt => opt.MapFrom(s => s.PersonalizedSignature))
                .ForMember(d=>d.AuditRejectedReason,opt=>opt.MapFrom(s=>s.AuditRejectedReason));

            base.CreateMap<UserInfoAuditDto, UserInfoAudit>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.UserId, opt => opt.MapFrom(s => s.UserId))
                .ForMember(d => d.NickName, opt => opt.MapFrom(s => s.NickName))
                .ForMember(d => d.AvatarUrl, opt => opt.MapFrom(s => s.AvatarUrl))
                .ForMember(d => d.PersonalHomepageUrl, opt => opt.MapFrom(s => s.PersonalHomepageUrl))
                .ForMember(d => d.PersonalizedSignature, opt => opt.MapFrom(s => s.PersonalizedSignature))
                .ForMember(d => d.AuditRejectedReason, opt => opt.MapFrom(s => s.AuditRejectedReason));

            base.CreateMap<UserInfo, UserInfoAudit>()
                .ForMember(d => d.UserId, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.NickName, opt => opt.MapFrom(s => s.NickName))
                .ForMember(d => d.AvatarUrl, opt => opt.MapFrom(s => s.AvatarUrl))
                .ForMember(d => d.PersonalHomepageUrl, opt => opt.MapFrom(s => s.PersonalHomepageUrl))
                .ForMember(d => d.PersonalizedSignature, opt => opt.MapFrom(s => s.PersonalizedSignature));
        }
    }
}
