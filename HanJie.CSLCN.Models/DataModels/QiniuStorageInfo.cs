using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class QiniuStorageInfo : BaseDataModel<QiniuStorageInfo, QiniuStorageInfoDto>
    {
        public string FriendlyName { get; set; }
        public string StorageRealName { get; set; }
        public string DirectoryPath { get; set; }
    }
}
