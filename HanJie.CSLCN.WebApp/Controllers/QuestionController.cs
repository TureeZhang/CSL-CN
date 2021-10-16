using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    public class QuestionController : BaseController
    {
        public QuestionController(IUserStatuService userStatuService)
            : base(userStatuService)
        {
        }

        [HttpGet]
        public void Get(string id)
        {

        }


        [HttpPost]
        public void Create()
        {

        }
    }
}
