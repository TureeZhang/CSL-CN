using System;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public interface ISmsService
    {
        string SendValidateCode(string phoneNumber);
    }
}