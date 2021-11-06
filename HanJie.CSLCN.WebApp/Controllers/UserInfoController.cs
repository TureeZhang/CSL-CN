using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class UserInfoController : BaseController
    {
        private IUserInfoService _userInfoService;
        private ISensitiveWordHelper _sensitiveWordHelper;

        public UserInfoController(IUserInfoService userInfoService,
            IUserStatuService userStatuService,
            ISensitiveWordHelper sensitiveWordHelper) : base(userStatuService)
        {
            _userInfoService = userInfoService;
            _sensitiveWordHelper = sensitiveWordHelper;
        }

        [HttpGet]
        public IActionResult GetCurrentUser()
        {
            return Json(base.CurrentUser);
        }

        [HttpPost]
        public IActionResult Post(UserInfoDto userInfo)
        {
            if (userInfo.Id != base.CurrentUser.Id)
                return new NotFoundResult();

            this._userInfoService.UpdateAsync(new UserInfo().ConvertFromDtoModel(userInfo));
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(UserInfoDto userInfo)
        {
            Ensure.NotNull(userInfo, nameof(userInfo));
            Ensure.NotContainsSensitiveWord(userInfo.NickName, nameof(userInfo.NickName));

            await this._userInfoService.UpdateAsync(new UserInfo().ConvertFromDtoModel(userInfo));
            return Ok();
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            throw new NotImplementedException();
        }


    }
}