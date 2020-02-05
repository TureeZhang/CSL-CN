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
        /// <summary>
        /// 捐赠渠道
        /// Alipay
        /// WeChat
        /// </summary>
        public string PaymentCompany { get; set; }

        /// <summary>
        /// 加密的支付宝用户昵称
        /// </summary>
        public string PaymentUserNameSecretly { get; set; }

        /// <summary>
        /// 加密的支付宝账号
        /// </summary
        public string PaymentAccountSecretly { get; set; }

        /// <summary>
        /// 交易单号
        /// </summary>
        public string OrderId { get; set; }

        public override DonatorRankDto ConvertFromDataModel(DonatorRank dataModel)
        {
            DonatorRankDto result = new DonatorRankDto();
            result.DonateTotalCount = dataModel.DonateTotalCount;
            result.Id = dataModel.Id;
            result.LastModifyDate = dataModel.LastModifyDate.ToString();
            result.UserId = dataModel.UserId;
            result.PaymentCompany = dataModel.PaymentCompany.ToString();
            result.PaymentUserNameSecretly = dataModel.PaymentUserNameSecretly;
            result.PaymentAccountSecretly = dataModel.PaymentAccountSecretly;
            result.OrderId = dataModel.OrderId;

            return result;
        }
    }
}
