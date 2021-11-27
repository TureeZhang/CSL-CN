using System;
using System.Collections.Generic;
using System.Linq;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QiniuStorageInfoController : ControllerBase
    {

        private IQiniuService _qiniuService;

        public QiniuStorageInfoController(IQiniuService qiniuService)
        {
            this._qiniuService = qiniuService;
        }

        /// <summary>
        /// 请求资源的 CDN 后缀地址
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public string Get(int id)
        {
            Ensure.NotNull(id, nameof(id));

            QiniuStorageInfo dto = this._qiniuService.GetById(id);
            return dto.FullName;
        }


    }
}