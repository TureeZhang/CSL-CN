using System;
namespace HanJie.CSLCN.Models.MyExceptions
{
    public class UserException :Exception
    {
        public UserException(string msg)
            :base(msg)
        {
        }
    }
}
