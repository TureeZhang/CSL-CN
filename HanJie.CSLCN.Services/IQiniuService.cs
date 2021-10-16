using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;

namespace HanJie.CSLCN.Services
{
    public interface IQiniuService
    {
        bool AuthCallBackHeader(string contentType, string authorization, string callBackUrl, string callBackBody);
        Task<string> CallBackHandler(string contentType, string authorization, string callBackUrl, string callBackBody);
        string GetUploadToken(string storageFullName);
        Task<QiniuStorageInfo> UpdateFileStorageInfo(QiniuStorageInfo qiniuStorageInfo);
        Task<QiniuStorageInfo> GetById(int id);

    }
}