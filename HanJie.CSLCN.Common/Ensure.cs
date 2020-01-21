using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Common
{
    public static class Ensure
    {
        public static void NotNull(string value,string parameterName)
        {
            if (string.IsNullOrEmpty(value))
                throw new ArgumentNullException(parameterName);
        }
    }
}
