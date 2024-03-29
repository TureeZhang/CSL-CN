﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class ValidateCodeController : BaseController
    {
        private readonly IValidateCodeService _humanMachineValidateService;

        public ValidateCodeController(
            IValidateCodeService humanMachineValidateService,
            IUserStatuService userStatuService)
            : base(userStatuService)
        {
            this._humanMachineValidateService = humanMachineValidateService;
        }

        [HttpGet("/api/ValidateCode")]
        public ActionResult Get()
        {
            string imgBase64Str = this._humanMachineValidateService.GetCodeImageBase64String(base.HttpContext.Connection.RemoteIpAddress.ToString());
            return new JsonResult(imgBase64Str);
        }

    }
}
