using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Common.AppSettings;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Tests
{
    public static class TestHelper
    {
        public static void MockGlobalConfigs()
        {
            AppSettings appSettings = new AppSettings();
            appSettings.Md5Sold = "";
            appSettings.Redis = new Redis()
            {
                Host = "118.31.20.44",
                Port = 6380,
                Password = "1B6EA65D-4AE0-4A6A-B2FA-28841D622C20"
            };

            GlobalConfigs.AppSettings = appSettings;
        }
    }
}
