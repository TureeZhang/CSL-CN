using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class Sms : BaseDataModel<Sms, SmsDto>
    {
        public SMSTypeEnum SMSTypeEnum { get; set; }
        public string PhoneNumber { get; set; }
        public string Content { get; set; }
        public DateTime SendDate { get; set; }
        public DateTime ExpireAt { get; set; }
    }
}
