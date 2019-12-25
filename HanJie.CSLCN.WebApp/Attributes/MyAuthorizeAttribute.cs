using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.Enums;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace HanJie.CSLCN.WebApp.Attributes
{
    public class MyAuthorizeAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            //do nothing here.
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            string userStatusCookieGuid = context.HttpContext.Request.Cookies[StringTagEnum.CurrentLoginedUserGuid];
            if (string.IsNullOrEmpty(userStatusCookieGuid))
            {
                context.Result = new UnauthorizedResult();
            }

            if (!UserStatuService.LoginedUsers[userStatusCookieGuid].IsAdmin)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}
