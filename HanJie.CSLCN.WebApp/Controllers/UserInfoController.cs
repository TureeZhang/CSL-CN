using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInfoController : BaseController
    {
        private UserInfoService _userInfoService;

        public UserInfoController(UserInfoService userInfoService,
            UserStatuService userStatuService) : base(userStatuService)
        {
            _userInfoService = userInfoService;
        }

        [HttpGet]
        public string Get()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public string Post(UserInfoDto userInfo)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        public string Put()
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            throw new NotImplementedException();
        }

    }
}