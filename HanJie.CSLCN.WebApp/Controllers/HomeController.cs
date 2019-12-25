using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HanJie.CSLCN.WebApp.Controllers
{
    public class HomeController : Controller
    {
        [Route("homepage")]
        public IActionResult Index()
        {
            return Redirect("/index.html");
        }
    }
}
