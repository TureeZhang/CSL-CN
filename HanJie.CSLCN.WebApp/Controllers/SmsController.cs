using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.MyExceptions;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class SmsController : Controller
    {
        private readonly IValidateCodeService _humanMachineValidateService;

        public SmsController(IValidateCodeService humanMachineValidateService)
        {
            this._humanMachineValidateService = humanMachineValidateService;
        }

        // GET: api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Dictionary<string, string> pars)
        {
            string phoneNumber = null;
            string validateCode = null;
            pars.TryGetValue("phoneNumber", out phoneNumber);
            pars.TryGetValue("validateCode", out validateCode);

            Ensure.NotNull(phoneNumber, nameof(phoneNumber));
            Ensure.NotNull(validateCode, nameof(validateCode));

            if (!await this._humanMachineValidateService.IsValidateCodeEqualAsync(Request.HttpContext.Connection.RemoteIpAddress.ToString(), validateCode))
                throw new UserException($"验证码输入有误");

            await this._humanMachineValidateService.SendSmsValidateCode(phoneNumber);
            return Ok();
        }
    }
}
