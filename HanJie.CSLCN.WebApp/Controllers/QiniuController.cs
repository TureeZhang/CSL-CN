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
    public class QiniuController : ControllerBase
    {
        private QiniuService _qiniuService;

        public QiniuController(QiniuService qiniuService)
        {
            this._qiniuService = qiniuService;
        }

        [HttpGet]
        public string GetUploadToken(string storageFullName)
        {
            Ensure.NotNull(storageFullName, nameof(storageFullName));

            return this._qiniuService.GetUploadToken(storageFullName);
        }
    }
}