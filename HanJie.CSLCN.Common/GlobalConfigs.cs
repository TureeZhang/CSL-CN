using HanJie.CSLCN.Models.Common.AppSettings;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Common
{
    public static class GlobalConfigs
    {
        private static AppSettings appSettings;
        /// <summary>
        /// AppSettings.json 文件的强类型对象，该对象可用于读取 appsettings.json 配置文件中设定的值。
        /// </summary>
        public static AppSettings AppSettings
        {
            get
            {
                return appSettings;
            }
            set
            {
                if (appSettings == null)
                {
                    appSettings = value;
                }
            }
        }
    }
}
