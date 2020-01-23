using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Common.AppSettings
{
    public class QiniuConfig
    {
        public string AccessKey { get; set; }
        public string SecretKey { get; set; }
        public string BucketName { get; set; }
        public string HttpEndPoint { get; set; }
        public string CallBackUrl { get; set; }
    }
}
