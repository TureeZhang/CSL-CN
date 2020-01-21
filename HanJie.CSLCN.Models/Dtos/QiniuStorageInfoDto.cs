using HanJie.CSLCN.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class QiniuStorageInfoDto : BaseDtoModel<QiniuStorageInfoDto, QiniuStorageInfo>
    {
        public string FriendlyName { get; set; }
        public string StorageRealName { get; set; }
    } 
}
