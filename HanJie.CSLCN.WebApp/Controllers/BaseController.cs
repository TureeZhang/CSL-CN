using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : Controller
    {
        private UserStatuService _userStatuService;

        protected UserInfoDto CurrentUser { get; private set; }

        protected bool IsLogin => this.CurrentUser != null;

        public BaseController(UserStatuService userStatuService)
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
            string loginedUserCookie = base.Request.Cookies["current-logined-user-guid"];

            if (RunAs.Debug && loginedUserCookie == null)    //Debug 环境前端跨域不发送 cookie
            {
                this.CurrentUser = new UserInfoDto
                {
                    Id = 1,
                    AvatarUrl = "/assets/user-avatar/journey.JPG",
                    CreateDate = "2019-07-09 21:51:00.000000",
                    LastModifyDate = "2019-07-09 21:51:00.000000",
                    PersonalHomepageUrl = "https://space.bilibili.com/242720226",
                    IsLoginSuccess = true,
                    UserName = "aa940724",
                    NickName = "虎牙汉界",
                    IsAdmin = true
                };
                return;
            }

            if (!string.IsNullOrEmpty(loginedUserCookie))
            {
                UserInfoDto currentUser = null;
                UserStatuService.LoginedUsers.TryGetValue(loginedUserCookie, out currentUser);
                this.CurrentUser = currentUser;
            }
        }

    }
}