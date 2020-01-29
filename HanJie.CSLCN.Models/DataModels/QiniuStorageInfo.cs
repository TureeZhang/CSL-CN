using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class QiniuStorageInfo : BaseDataModel<QiniuStorageInfo, QiniuStorageInfoDto>
    {
        /// <summary>
        /// 文件存储在七牛的完整名称
        /// </summary>
        [Required]
        public string FullName { get; set; }

        /// <summary>
        /// 文件哈希值
        /// </summary>
        [Required, MaxLength(256)]
        public string Hash { get; set; }

        [Required]
        /// <summary>
        /// 文件大小，单位字节
        /// </summary>
        public int FileSize { get; set; }

        [Required]
        /// <summary>
        /// 文件的媒体类型
        /// 
        /// 例如 jpg 为 image/jpeg
        /// </summary>
        public string MimeType { get; set; }

        [Range(0, 9999)]
        /// <summary>
        /// 图片宽度。若非图片则为 -1
        /// </summary>
        public int ImageWidth { get; set; } = -1;

        [Range(0, 9999)]
        /// <summary>
        /// 图片高度。若非图片则为 -1
        /// </summary>
        public int ImageHeight { get; set; } = -1;
    }
}
