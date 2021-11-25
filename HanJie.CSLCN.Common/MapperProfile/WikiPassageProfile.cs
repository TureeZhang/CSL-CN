using System;
using AutoMapper;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Common.MapperProfile
{
    public class WikiPassageProfile : Profile
    {
        public WikiPassageProfile()
        {

            base.CreateMap<WikiPassage, WikiPassageDto>()
                .ForMember(d => d.CreateDate, opt => opt.MapFrom(s => s.CreateDate.ToString("yyyy-MM-dd hh:mm")))
                .ForMember(d => d.MainAuthors, opt => opt.Ignore())
                .ForMember(d => d.CoAuthors, opt => opt.Ignore());

            base.CreateMap<WikiPassageDto, WikiPassage>()
                .ForMember(d => d.MainAuthors, opt => opt.Ignore())
                .ForMember(d => d.CoAuthors, opt => opt.Ignore());

            base.CreateMap<WikiPassageCommentDto, WikiPassageComment>();
            base.CreateMap<WikiPassageComment, WikiPassageCommentDto>()
                .ForMember(d => d.CreateDate, opt => opt.MapFrom(s => s.CreateDate.ToString("yyyy-MM-dd hh:mm")));
        }
    }
}
