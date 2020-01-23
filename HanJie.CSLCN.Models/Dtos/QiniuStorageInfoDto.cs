using HanJie.CSLCN.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class QiniuStorageInfoDto : BaseDtoModel<QiniuStorageInfoDto, QiniuStorageInfo>
    {
        /// <summary>
        /// 文件存储在七牛的完整名称
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// 文件哈希值
        /// </summary>
        public string Hash { get; set; }

        /// <summary>
        /// 文件大小，单位字节
        /// </summary>
        public int FileSize { get; set; }

        /// <summary>
        /// 文件的媒体类型
        /// 
        /// 例如 jpg 为 image/jpeg
        /// </summary>
        public string MimeType { get; set; }

        /// <summary>
        /// 图片宽度。若非图片则为 -1
        /// </summary>
        public int ImageWidth { get; set; } = -1;

        /// <summary>
        /// 图片高度。若非图片则为 -1
        /// </summary>
        public int ImageHeight { get; set; } = -1;

        /// <summary>
        /// 上传所需的鉴权 token
        /// </summary>
        public string UploadToken { get; set; }
    }
}
