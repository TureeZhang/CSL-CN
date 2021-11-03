using System;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public interface ISmsService
    {
        Task<string> SendValidateCode(string phoneNumber);
    }
}