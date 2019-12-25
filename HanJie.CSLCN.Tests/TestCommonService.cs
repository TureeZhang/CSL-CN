using HanJie.CSLCN.Common;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace HanJie.CSLCN.Tests
{

    public class TestCommonService
    {

        public TestCommonService()
        {
            TestHelper.MockGlobalConfigs();
        }

        [Fact]
        public void TestMd5Helper_ShouldReturnSecret()
        {
            CommonHelper commonHelper = new CommonHelper();
            string secret = commonHelper.GetMd5Base64StringUsePrivateSold("123456");

            Assert.Equal("hLivWAa1hoSDPJ4w+vl0MA==", secret);
        }
    }
}
