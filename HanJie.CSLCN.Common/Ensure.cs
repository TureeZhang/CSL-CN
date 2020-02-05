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

        public static void MoreThan(decimal value, decimal minValueNotInclued, string parameterName)
        {
            NotNull(parameterName, nameof(parameterName));

            if (!(value > minValueNotInclued))
                throw new ArgumentOutOfRangeException($"参数 {parameterName} 的值应当 > {minValueNotInclued}。");
        }

        public static void MoreThan(int value, int minValueNotInclued, string parameterName)
        {
            NotNull(parameterName, nameof(parameterName));

            if (!(value > minValueNotInclued))
                throw new ArgumentOutOfRangeException($"参数 {parameterName} 的值应当 > {minValueNotInclued}。");
        }

        public static void EqualOrMoreThan(int value, int minValueInclude, string parameterName)
        {
            NotNull(parameterName, nameof(parameterName));

            if (!(value >= minValueInclude))
                throw new ArgumentOutOfRangeException($"参数 {parameterName} 的值应当 ≥ {minValueInclude}");
        }

        public static void EqualOrMoreThan(decimal value, decimal minValueInclude, string parameterName)
        {
            NotNull(parameterName, nameof(parameterName));

            if (!(value >= minValueInclude))
                throw new ArgumentOutOfRangeException($"参数 {parameterName} 的值应当 ≥ {minValueInclude}");
        }
    }
}
