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

        private IQiniuService _qiniuService;

        public QiniuCallBackController(IQiniuService qiniuService)
        {
            this._qiniuService = qiniuService;
        }

        [HttpPost]
        public async Task<string> Post()
        {

            string contentType = Request.ContentType;
            string authorizationHeader = Request.Headers[HttpConsts.Authorization];
            string callBackUrl = $"http://{Request.Host.Value}{Request.Path.Value}";
            string callBackBody = await new StreamReader(Request.Body).ReadToEndAsync();

            string result = await this._qiniuService.CallBackHandler(contentType, authorizationHeader, callBackUrl, callBackBody);

            return result;
        }

        /// <summary>
        /// 此方法的存在是由于本地开发测试时，无暴露向公网可以被直接访问的地址。
        /// 通过将七牛在测试环境回调的数据记录为文件再手动 POST 给测试环境回调方法，完成测试。
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("/api/qiniucallbacktest")]
        public async Task<string> PostForTest()
        {
            string contentType = Request.ContentType;
            string authorizationHeader = Request.Headers[HttpConsts.Authorization];
            string callBackUrl = $"http://{Request.Host.Value}{Request.Path.Value}";
            string callBackBody = await new StreamReader(Request.Body).ReadToEndAsync();

            System.IO.File.WriteAllText("callback.txt", JsonConvert.SerializeObject(new { contentType, authorizationHeader, callBackUrl, callBackBody }));
            string result = JsonConvert.SerializeObject(new { ret = "success", info = JsonConvert.DeserializeObject<QiniuStorageInfoDto>(callBackBody) });

            return result;
        }

    }
}