﻿using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.MyExceptions;
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
        private readonly IHumanMachineValidateService _humanMachineValidateService;

        public RegisterController(IUserInfoService userInfoService,
            IHumanMachineValidateService  humanMachineValidateService)
        {
            this._userInfoService = userInfoService;
            this._humanMachineValidateService = humanMachineValidateService;
        }

        [HttpPost]
        public async Task<IActionResult> RegistNewUser([FromForm] UserInfoDto userInfoDto,[FromQuery]string smsCode)
        {
            Ensure.NotNull(userInfoDto, nameof(userInfoDto));
            Ensure.NotNull(smsCode, nameof(smsCode));

            this._userInfoService.RegisterNewUser(userInfoDto, smsCode);
            return Ok();
        }
    }
}
