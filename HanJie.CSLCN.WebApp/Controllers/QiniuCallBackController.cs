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
using Newtonsoft.Json;

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
            string authorizationHeader = Request.Headers[HttpConsts.Authorization];
            string callBackUrl = "http://www.cities-skylines.cn/api/qiniucallback";
            string callBackBody = await new StreamReader(Request.Body).ReadToEndAsync();

            string result = string.Empty;
            if (RunAs.Debug)
            {
                result = await this._qiniuService.CallBackHandler(contentType, authorizationHeader, callBackUrl, callBackBody);
            }
            if (RunAs.Release)
            {
                System.IO.File.WriteAllText("callback.txt", JsonConvert.SerializeObject(new { contentType, authorizationHeader, callBackUrl, callBackBody }));
                result = JsonConvert.SerializeObject(new { ret = "success" });
            }

            return result;
        }

    }
}