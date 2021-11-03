using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class SmsController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get(string phoneNumber,string validateCode)
        {
            this.
        }
    }
}
