using HanJie.CSLCN.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public partial class DonatorRankDto : BaseDtoModel<DonatorRankDto, DonatorRank>
    {
        public int UserId { get; set; }
        public string UserNickName { get; set; }
        public decimal DonateTotalCount { get; set; }
        public string PersonalTitle { get; set; }
        public string DescriptionWord { get; set; }
        public string AvatarUrl { get; set; }
        public string PersonalHomepageUrl { get; set; }

        public override DonatorRankDto ConvertFromDataModel(DonatorRank dataModel)
        {
            DonatorRankDto result = new DonatorRankDto();
            result.CreateDate = dataModel.CreateDate.ToString();
            result.DescriptionWord = dataModel.DescriptionWord;
            result.DonateTotalCount = dataModel.DonateTotalCount;
            result.Id = dataModel.Id;
            result.LastModifyDate = dataModel.LastModifyDate.ToString();
            result.PersonalTitle = dataModel.PersonalTitle;
            result.UserId = dataModel.UserId;

            return result;
        }
    }
}
