using System.Threading.Tasks;
using HanJie.CSLCN.Models.Enums;

namespace HanJie.CSLCN.Services
{
    public interface ILogService
    {
        void Log(string message, LogLevelEnum logLevel = LogLevelEnum.Info, object parameters = null);
    }
}