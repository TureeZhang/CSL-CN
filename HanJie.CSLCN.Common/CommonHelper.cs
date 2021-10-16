using HanJie.CSLCN.Models.Common;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace HanJie.CSLCN.Common
{
    public class CommonHelper : BaseHelper, ICommonHelper
    {
        /// <summary>
        /// 获取字符串的MD5-BASE64字符串（采用加盐）
        /// </summary>
        /// <param name="content">明文</param>
        /// <returns>加盐的 md5-base64 秘闻</returns>
        public string GetMd5Base64StringUsePrivateSold(string content)
        {
            byte[] bytes = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes($"{content}{GlobalConfigs.AppSettings.Md5Sold}"));
            string base64String = Convert.ToBase64String(bytes);

            return base64String;
        }

        public bool IsValidHostValue(string hostValue)
        {
            Ensure.NotNull(hostValue, nameof(hostValue));

            if (hostValue != "www.cities-skylines.cn" &&
                hostValue != "localhost:5000" &&
                hostValue != "localhost:4200")
            {
                return false;
            }

            return true;
        }
    }
}
