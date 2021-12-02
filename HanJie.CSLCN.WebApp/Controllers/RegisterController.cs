using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.MyExceptions;
using HanJie.CSLCN.Services;
using HanJie.CSLCN.WebApp.Attributes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(UserExceptionFilter))]
    [ApiController]
    public class RegisterController : Controller
    {

        private IUserInfoService _userInfoService;
        private readonly IValidateCodeService _humanMachineValidateService;

        public RegisterController(IUserInfoService userInfoService,
            IValidateCodeService humanMachineValidateService)
        {
            this._userInfoService = userInfoService;
            this._humanMachineValidateService = humanMachineValidateService;
        }

        [HttpPost("/api/register/RegistNewUser")]
        public IActionResult RegistNewUser([FromBody] UserInfoDto userInfoDto, [FromQuery] string smsCode)
        {
            Ensure.NotNull(userInfoDto, nameof(userInfoDto));
            Ensure.NotNull(smsCode, nameof(smsCode));

            this._userInfoService.RegisterNewUser(userInfoDto, smsCode);
            return Ok();
        }
    }
}
