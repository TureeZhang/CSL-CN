using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class AuditController : BaseController
    {
        private readonly IAuditService _auditService;
        private readonly IUserInfoService _userInfoService;

        public AuditController(IUserStatuService userStatuService,
            IAuditService auditService,
            IUserInfoService userInfoService)
            : base(userStatuService)
        {
            this._auditService = auditService;
            this._userInfoService = userInfoService;
        }

        public IActionResult ListUnAuditedUsers()
        {
            if (!base.CurrentUser.IsAdmin)
                return new NotFoundResult();

            return new JsonResult(this._userInfoService.ListUnAuditedUsers());
        }

        // GET: api/values
        [HttpPost("api/[controller]/user")]
        public IActionResult Post(int userId)
        {
            this._auditService.ConfirmUser(userId);
            return Ok();
        }


    }
}
