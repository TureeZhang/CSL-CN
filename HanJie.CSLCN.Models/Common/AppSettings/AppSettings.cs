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

        public QiniuConfig QiniuConfig { get; set; }

        public Redis Redis { get; set; }
    }




}
