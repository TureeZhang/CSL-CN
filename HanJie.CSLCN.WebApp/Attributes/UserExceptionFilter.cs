using System;
using System.Net;
using System.Text;
using HanJie.CSLCN.Models.MyExceptions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace HanJie.CSLCN.WebApp.Attributes
{
    public class UserExceptionFilter : IExceptionFilter
    {

        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IModelMetadataProvider _modelMetadataProvider;

        public UserExceptionFilter(
            IWebHostEnvironment hostingEnvironment,
            IModelMetadataProvider modelMetadataProvider)
        {
            _hostingEnvironment = hostingEnvironment;
            _modelMetadataProvider = modelMetadataProvider;
        }

        public void OnException(ExceptionContext context)
        {
            //see msdoc:https://docs.microsoft.com/zh-cn/aspnet/core/mvc/controllers/filters?view=aspnetcore-3.1#exception-filters

            if (!(context.Exception is UserException))
                return;

            context.ExceptionHandled = true;

            context.Result = new JsonResult(new { errMsg = context.Exception.Message });
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        }
    }
}

