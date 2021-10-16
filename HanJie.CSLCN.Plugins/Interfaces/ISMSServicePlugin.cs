using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Plugins.Interfaces
{
    public interface ISMSServicePlugin
    {
        void SendMessage(string phoneNumber, string contentValue);

    }
}
