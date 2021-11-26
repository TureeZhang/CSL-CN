using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using HanJie.CSLCN.Models.MyExceptions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class SmsService : BaseService<SmsDto, Sms>, ISmsService
    {
        private readonly IRedisService _redisService;
        private const string _pausedPhoneRedisKey = "validate-code-pausedphone";
        private AlibabaCloud.SDK.Dysmsapi20170525.Client _smsClient;

        public SmsService(
            CSLDbContext cslDbContext,
            ICommonHelper commonHelper,
            IRedisService redisService)
            : base(cslDbContext, commonHelper)
        {
            this._redisService = redisService;
            this._smsClient = CreateClient();
        }

        public async Task<string> SendValidateCode(string phoneNumber)
        {
            if (await IsPausedPhone(phoneNumber))
                throw new UserException($"短息验证码发送失败：当前手机号码 10 分钟内曾发送过验证码，请稍后重试。");

            if (!phoneNumber.StartsWith("+86"))
                throw new UserException($"短信验证码发送失败：暂不支持向境外手机号码发送短信验证码。");

            string code = new Random().Next(100000, 999999).ToString();
            this.SendSms(phoneNumber, code, new TimeSpan(0, 10, 0));

            return code;
        }

        private void InsertPauseList(string phoneNumber)
        {
            Ensure.NotNull(phoneNumber, nameof(phoneNumber));
            this._redisService.StringSetAsync($"{_pausedPhoneRedisKey}{phoneNumber}", "暂停发送10分钟", new TimeSpan(0, 10, 0));
        }

        private async Task<bool> IsPausedPhone(string phoneNumber)
        {
            Ensure.NotNull(phoneNumber, nameof(phoneNumber));

            string str = await this._redisService.StringGetAsync($"{_pausedPhoneRedisKey}{phoneNumber}");

            //因为设置暂停发送时 key 的过期时间设置为 10 分钟，因此如果没有取到值说明 key 不在暂停列表中，还没发送过短信或已超过暂停发送的冻结时间
            if (string.IsNullOrEmpty(str))
                return false;

            return true;
        }

        private void SendSms(string phoneNumber, string code, TimeSpan expireAfter)
        {

            AlibabaCloud.SDK.Dysmsapi20170525.Models.SendSmsRequest sendSmsRequest = new AlibabaCloud.SDK.Dysmsapi20170525.Models.SendSmsRequest
            {
                PhoneNumbers = phoneNumber,
                SignName = "汉界的一颗小虎牙",
                TemplateCode = "手机验证码",
                TemplateParam = $"{{\"code\":\"{code}\"}}",
            };
            this._smsClient.SendSms(sendSmsRequest);

            //发送完成后送入冷却列表 10 分钟。
            if (RunAs.Release)
                InsertPauseList(phoneNumber);
        }

        private AlibabaCloud.SDK.Dysmsapi20170525.Client CreateClient()
        {
            AlibabaCloud.OpenApiClient.Models.Config config = new AlibabaCloud.OpenApiClient.Models.Config
            {
                // 您的AccessKey ID
                AccessKeyId = GlobalConfigs.AppSettings.AliyunSmsAccessKey,
                // 您的AccessKey Secret
                AccessKeySecret = GlobalConfigs.AppSettings.AliyunSmsSecretKey
            };
            // 访问的域名
            config.Endpoint = "dysmsapi.aliyuncs.com";
            return new AlibabaCloud.SDK.Dysmsapi20170525.Client(config);
        }


    }
}
