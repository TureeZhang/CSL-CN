using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Common;
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

            GlobalConfigs.AppSettings = appSettings;
        }
    }
}
