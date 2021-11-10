using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Services;
using HanJie.CSLCN.WebApp.Attributes;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [AdministratorOnly]
    public class AuditController : BaseController
    {
        private readonly IAuditService _auditService;

        public AuditController(IUserStatuService userStatuService,
            IAuditService auditService,
            IUserInfoService userInfoService)
            : base(userStatuService)
        {
            this._auditService = auditService;
        }

        // GET: api/values
        [HttpGet("/api/[controller]/confirmuser")]
        public IActionResult ConfirmUser(int userId)
        {
            Ensure.IsDatabaseId(userId, nameof(userId));

            this._auditService.ConfirmUser(userId);
            return Ok();
        }

        [HttpGet("/api/[controller]/rejectuser")]
        public IActionResult RejectUser(int userId,string reason)
        {
            Ensure.IsDatabaseId(userId, nameof(userId));
            Ensure.NotNull(reason, nameof(reason));

            this._auditService.RejectUser(userId, reason);
            return Ok();
        }


    }
}
