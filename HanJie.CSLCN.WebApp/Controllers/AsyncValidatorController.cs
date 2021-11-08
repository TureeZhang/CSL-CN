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
        private readonly IUserInfoService _userInfoService;

        public AsyncValidatorController(ISensitiveWordHelper sensitiveWordHelper,
            IUserInfoService userInfoService)
        {
            this._sensitiveWordHelper = sensitiveWordHelper;
            this._userInfoService = userInfoService;
        }


        [Route("/api/[controller]/sensitiveword")]
        [HttpGet]
        public IActionResult IsSensitiveWork([FromQuery] string testword)
        {
            bool isSensitiveWord = this._sensitiveWordHelper.IsContainsSensitiveWord(testword);
            return new JsonResult(isSensitiveWord);
        }

        [Route("/api/[controller]/usernameexisted")]
        [HttpGet]
        public async Task<IActionResult> IsUserNameExisted([FromQuery] string username)
        {
            bool isExisted = await this._userInfoService.IsUserNameDuplicated(username);
            return new JsonResult(isExisted);
        }
    }
}
