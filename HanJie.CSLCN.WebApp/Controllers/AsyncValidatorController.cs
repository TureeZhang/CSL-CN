using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using HanJie.CSLCN.Models.Enums;
using HanJie.CSLCN.Common;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class AsyncValidatorController : Controller
    {
        private ISensitiveWordHelper _sensitiveWordHelper;

        public AsyncValidatorController(ISensitiveWordHelper sensitiveWordHelper)
        {
            _sensitiveWordHelper = sensitiveWordHelper;
        }


        [Route("/api/[controller]/sensitiveword")]
        [HttpGet]
        public IActionResult Index([FromQuery]string testword)
        {
            bool isSensitiveWord = this._sensitiveWordHelper.IsContainsSensitiveWord(testword);
            return new JsonResult(isSensitiveWord);
        }
    }
}
