using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Consts;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QiniuCallBackController : ControllerBase
    {

        private QiniuService _qiniuService;

        public QiniuCallBackController(QiniuService qiniuService)
        {
            this._qiniuService = qiniuService;
        }

        [HttpPost]
        public async Task<string> Post()
        {
            string contentType = Request.ContentType;
            string authorizationHeader = Request.Headers[HttpHeaders.Authentication];
            string callBackUrl = "http://www.cities-skylines.cn/api/qiniucallback";
            string callBackBody = await new StreamReader(Request.Body).ReadToEndAsync();

            string result = await this._qiniuService.CallBackHandler(contentType, authorizationHeader, callBackUrl, callBackBody);

            return result;
        }

    }
}