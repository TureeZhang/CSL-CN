using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Services
{
    public class SMSService : BaseService<SmsDto, Sms>, ISMSService
    {

        public SMSService(CSLDbContext cslDbContext, ICommonHelper commonHelper)
            : base(cslDbContext, commonHelper)
        {

        }

        public void SendSms(string phoneNumber, string content, TimeSpan expireAfter)
        {

        }

        public void SendValidateCode(string phoneNumber, int code, TimeSpan expireAfter)
        {

        }

        /// <summary>
        /// 发送
        /// </summary>
        /// <returns></returns>
        private string GetExistAvailableCode()
        {
            throw new NotImplementedException();
        }
    }
}
