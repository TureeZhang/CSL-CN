using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using Qiniu.Storage;
using Qiniu.Util;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Services
{
    public class QiniuService : BaseService<QiniuStorageInfoDto, QiniuStorageInfo>
    {
        private readonly Mac _mac;

        public QiniuService()
        {
            this._mac = new Mac(GlobalConfigs.AppSettings.QiniuConfig.AccessKey, GlobalConfigs.AppSettings.QiniuConfig.SecretKey);
        }

        public string GetUploadToken()
        {
            PutPolicy putPolicy = new PutPolicy();
            putPolicy.Scope = GlobalConfigs.AppSettings.QiniuConfig.BucketName;
            string token = Auth.CreateUploadToken(this._mac, putPolicy.ToJsonString());

            return token;
        }

        public  GetUploadInfo()
        {

        }


    }
}
