using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace HanJie.CSLCN.WebApp.Attributes
{
    public class AdministratorOnlyAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            //do nothing here.
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (RunAs.Debug)
                return;

            string userStatusCookieGuid = context.HttpContext.Request.Cookies[StringTagEnum.CurrentLoginedUserGuid];
            if (string.IsNullOrEmpty(userStatusCookieGuid))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            UserInfoDto userInfoDto = UserStatuService.LoginedUsers[userStatusCookieGuid];
            if (!userInfoDto.IsAdmin)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
        }
    }
}
