using System;
using System.Collections.Generic;
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
    public class QiniuUploadController : ControllerBase
    {
        private QiniuService _qiniuService;

        public QiniuUploadController(QiniuService qiniuService)
        {
            this._qiniuService = qiniuService;
        }

        [HttpGet]
        public JsonResult GetUploadToken(string storageFullName)
        {
            Ensure.NotNull(storageFullName, nameof(storageFullName));

            string token = this._qiniuService.GetUploadToken(storageFullName);

            return new JsonResult(token);
        }
    }
}