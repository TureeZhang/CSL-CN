using System;

namespace HanJie.CSLCN.Services
{
    public interface ISMSService
    {
        void SendSms(string phoneNumber, string content, TimeSpan expireAfter);
        void SendValidateCode(string phoneNumber, int code, TimeSpan expireAfter);
    }
}