using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class DonatorRank : BaseDataModel<DonatorRank, DonatorRankDto>
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// 捐赠总数
        /// </summary>
        [Required]
        public decimal DonateTotalCount { get; set; } = 0.00m;

        /// <summary>
        /// 捐赠渠道
        /// </summary>
        [Required]
        public PaymentCompanyEnum PaymentCompany { get; set; }

        /// <summary>
        /// 加密的支付宝用户昵称
        /// </summary>
        [Required]
        [MaxLength(64)]
        public string PaymentUserNameSecretly { get; set; }

        /// <summary>
        /// 加密的支付宝账号
        /// </summary>
        [Required]
        [MaxLength(64)]
        public string PaymentAccountSecretly { get; set; }

        /// <summary>
        /// 交易单号
        /// </summary>
        [Required]
        [MaxLength(128)]
        public string OrderId { get; set; }
    }
}
