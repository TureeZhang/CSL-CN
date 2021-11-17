using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using HanJie.CSLCN.WebApp.Attributes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(UserExceptionFilter))]
    [ApiController]
    public class BaseController : Controller
    {
        private IUserStatuService _userStatuService;

        protected UserInfoDto CurrentUser { get; set; }

        protected bool IsLogin => this.CurrentUser != null;

        public BaseController(IUserStatuService userStatuService)
        {
            _userStatuService = userStatuService;
        }


        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            if (!new CommonHelper().IsValidHostValue(Request.Host.Value))
            {
                Response.StatusCode = 404;
            }

            SetLoginedUserInfo();
        }

        public void SetLoginedUserInfo()
        {

            UserInfoDto currentUser = null;
            if (RunAs.Debug)
            {
                UserStatuService.LoginedUsers.TryGetValue("debug", out currentUser);
                this.CurrentUser = currentUser;
                return;
            }

            string loginedUserCookie = base.Request.Cookies["current-logined-user-guid"];
            if (!string.IsNullOrEmpty(loginedUserCookie))
            {
                UserStatuService.LoginedUsers.TryGetValue(loginedUserCookie, out currentUser);
                this.CurrentUser = currentUser;
            }
        }

    }
}