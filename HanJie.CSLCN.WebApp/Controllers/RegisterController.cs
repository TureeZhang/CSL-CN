using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HanJie.CSLCN.WebApp.Controllers
{
    public class RegisterController : Controller
    {

        private IUserInfoService _userInfoService;

        public RegisterController(IUserInfoService userInfoService)
        {
            this._userInfoService = userInfoService;
        }

        [HttpPost]
        public async Task<IActionResult> RegistNewUser([FromForm] UserInfoDto userInfoDto)
        {
            Ensure.NotNull(userInfoDto, nameof(userInfoDto));

            await this._userInfoService.AddAsync(new UserInfo().ConvertFromDtoModel(userInfoDto));
            return Ok();
        }
    }
}
