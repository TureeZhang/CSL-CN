using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Common.AppSettings
{
    public class AppSettings
    {
        public Logging Logging { get; set; }

        public string AllowedHosts { get; set; }

        /// <summary>
        /// 数据库连接字符串
        /// </summary>
        public string ConnectionString { get; set; }

        /// <summary>
        /// MD5 盐
        /// </summary>
        public string Md5Sold { get; set; }

        /// <summary>
        /// 上传文件的本地存储位置。
        /// 
        /// 注意，如果填写了此项配置，则使用本地存储。如果此项为空，则使用七牛存储。
        /// </summary>
        public string LocalUploadFilePath { get; set; }

        public QiniuConfig QiniuConfig { get; set; }

        public Redis Redis { get; set; }
    }




}
