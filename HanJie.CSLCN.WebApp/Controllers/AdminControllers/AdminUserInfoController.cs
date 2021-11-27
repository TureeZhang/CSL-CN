using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers.AdminControllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AdminUserInfoController : AdminBaseController
    {

        private IUserInfoService _userInfoService { get; set; }

        public AdminUserInfoController(IUserInfoService userInfoService
            , IUserStatuService userStatuService) : base(userStatuService)
        {
            this._userInfoService = userInfoService;
        }

        [HttpGet]
        public List<UserInfoDto> List()
        {
            return  this._userInfoService.ListDtoes();
        }

        [HttpGet]
        [Route("/api/admin/adminuserinfo/listuserinfoaudit")]
        public List<UserInfoAuditDto> ListUnAuditorUsersInfo()
        {
            return  this._userInfoService.ListUnAuditorUsersInfo();
        }

        [HttpGet("{id}")]
        public UserInfoDto Get(string id)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        [Route("/api/admin/adminuserinfo/isduplicated")]
        public JsonResult IsUserNameDuplicated(string userName)
        {
            Ensure.NotNull(userName, nameof(userName));

            bool result = this._userInfoService.IsUserNameDuplicated(userName);
            return Json(result);
        }

        [HttpPost]
        public virtual JsonResult Post(UserInfoDto userInfoDto)
        {
            UserInfo entity =  this._userInfoService.Add(new UserInfo().ConvertFromDtoModel(userInfoDto));
            UserInfoDto result = new UserInfoDto().ConvertFromDataModel(entity);
            return Json(result);
        }
    }
}