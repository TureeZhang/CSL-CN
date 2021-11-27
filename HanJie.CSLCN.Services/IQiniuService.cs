using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;

namespace HanJie.CSLCN.Services
{
    public interface IQiniuService
    {
        bool AuthCallBackHeader(string contentType, string authorization, string callBackUrl, string callBackBody);
        string CallBackHandler(string contentType, string authorization, string callBackUrl, string callBackBody);
        string GetUploadToken(string storageFullName);
        QiniuStorageInfo UpdateFileStorageInfo(QiniuStorageInfo qiniuStorageInfo);
        QiniuStorageInfo GetById(int id);
        void DeleteFile(int id);
        void DeleteFile(string key);
        void ReNameFile(int id, string newName);
        void ReNameFile(string sourceKey, string destinationKey);
    }
}