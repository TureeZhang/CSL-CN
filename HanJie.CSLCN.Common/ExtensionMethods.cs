using System;
namespace HanJie.CSLCN.Common
{
    public static class ExtensionMethods
    {
        public static string Remove(this string obj, string str)
        {
            return obj.Replace(str, string.Empty);
        }
    }
}
