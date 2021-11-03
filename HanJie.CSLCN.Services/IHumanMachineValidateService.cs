using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public interface IHumanMachineValidateService
    {
        Task<string> GetCodeImageBase64String(string clientId);
        Task<bool> IsValidateCodeEqualAsync(string clientId, string userInputCode);
    }
}