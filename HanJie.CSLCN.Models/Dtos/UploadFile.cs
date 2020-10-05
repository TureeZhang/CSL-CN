using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class UploadFile
    {
        public string FileName { get; set; }
        public Stream FileStream { get; set; }

        public UserInfoDto User { get; set; }
    }
}
