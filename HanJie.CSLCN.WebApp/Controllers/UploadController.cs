using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : BaseController
    {
        private QiniuService _qiniuService;
        private StorageService _storageService;

        public UploadController(QiniuService qiniuService,
            UserStatuService userStatuService,
            StorageService storageService) : base(userStatuService)
        {
            this._qiniuService = qiniuService;
            this._storageService = storageService;
        }

        [HttpGet]
        public JsonResult GetUploadToken(string storageFullName)
        {
            Ensure.NotNull(storageFullName, nameof(storageFullName));

            string token = string.Empty;
            if (!string.IsNullOrEmpty(GlobalConfigs.AppSettings.LocalUploadFilePath))
                token = "use-local-storage";
            else
                token = this._qiniuService.GetUploadToken(storageFullName);

            return new JsonResult(token);
        }

        [HttpPost]
        [Route("/api/upload/localstorage")]
        public IActionResult LocalStorage()
        {
            IFormFile formFile = base.Request.Form.Files[0];
            Ensure.NotNull(formFile, nameof(formFile));

            //todo: 此处可能需要检查上传文件的大小，开发一个配置
            //目前不限制
            MemoryStream ms = new MemoryStream();
            formFile.CopyTo(ms);

            UploadFile uploadFile = new UploadFile();
            uploadFile.FileName = formFile.FileName;
            uploadFile.FileStream = ms;

            string result = this._storageService.Save(uploadFile)[0];
            return Json(new { fileName = result });

        }
    }
}