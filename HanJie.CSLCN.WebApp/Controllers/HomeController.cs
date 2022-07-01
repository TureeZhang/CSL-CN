using HanJie.CSLCN.Common;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HanJie.CSLCN.WebApp.Controllers
{
    public class HomeController : Controller
    {
        [Route("/homepage/{0}")]
        [Route("/homepage")]
        public IActionResult Index()
        {
            try
            {
                if (!new CommonHelper().IsValidHostValue(Request.Host.Value))
                    throw new UnauthorizedAccessException("非法解析。");

                Response.StatusCode = 200;
                return File("/index.html", "text/html");
            }
            catch (UnauthorizedAccessException uAEx)
            {
                return NotFound("Illegal DNS.");
            }
        }
    }
}
