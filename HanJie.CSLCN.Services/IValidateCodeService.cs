using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public interface IValidateCodeService
    {
        ValidateCodeService.ArithmeticEquation CreateValidateArithmetic();
        string CreateValidateChinese(int length);
        Bitmap CreateValidateImage(ValidateCodeService.BitmapParam bitmapParam, ValidateCodeService.BitmapStyle bitmapStyle);
        string CreateValidateImageBase64String(ValidateCodeService.BitmapParam bitmapParam, ValidateCodeService.BitmapStyle bitmapStyle);
        byte[] CreateValidateImageBytes(ValidateCodeService.BitmapParam bitmapParam, ValidateCodeService.BitmapStyle bitmapStyle);
        string CreateValidateNumber(int length);
        Task<string> GetCodeImageBase64String(string clientId);
        string GetScopeString(List<string> arr, int start, int len);
        Task<bool> IsSmsCodeEqual(string phoneNumber, string smsCode);
        Task<bool> IsValidateCodeEqualAsync(string clientId, string userInputCode);
        Task SendSmsValidateCode(string phoneNumber);
        List<string> StringToArray(string str);
    }
}