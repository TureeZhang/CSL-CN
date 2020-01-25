using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Common
{
    public static class Ensure
    {
        public static void NotNull(string value, string parameterName)
        {
            if (string.IsNullOrEmpty(value))
                throw new ArgumentNullException(parameterName);
        }

        public static void NotNull(object value, string parameterName)
        {
            if (string.IsNullOrEmpty(parameterName))
                throw new ArgumentNullException(nameof(parameterName));

            if (value == null)
                throw new ArgumentNullException(parameterName);
        }

        public static void IsDatabaseId(int id, string parameterName)
        {
            Ensure.NotNull(parameterName, nameof(parameterName));

            if (id <= 0)
                throw new ArgumentOutOfRangeException(parameterName, id, "作为数据库数据的主键 Id 应当 ≥ 1");
        }
    }
}
