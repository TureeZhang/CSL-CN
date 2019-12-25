using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Common
{
    public static class RunAs
    {
        public static bool Debug => IsDebug();
        public static bool Release => !IsDebug();

        public static bool IsDebug()
        {
#if DEBUG
            return true;
#endif
#if RELEASE
            return false;
#endif
        }
    }
}
