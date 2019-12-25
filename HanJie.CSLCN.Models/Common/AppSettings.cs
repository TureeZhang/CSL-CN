using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Common
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
    }

    public class Logging
    {
        public LogLevel LogLevel { get; set; }

    }

    public class LogLevel
    {
        public string Default { get; set; }
    }
}
