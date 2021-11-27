using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInfoController : BaseController
    {
        private IUserInfoService _userInfoService;
        private ISensitiveWordHelper _sensitiveWordHelper;
        
        public UserInfoController(IUserInfoService userInfoService,
            IUserStatuService userStatuService,
            ISensitiveWordHelper sensitiveWordHelper) : base(userStatuService)
        {
            _userInfoService = userInfoService;
            _sensitiveWordHelper = sensitiveWordHelper;
        }

        [HttpGet]
        public IActionResult GetCurrentUser()
        {
            return Json(base.CurrentUser);
        }

        [HttpPost]
        public IActionResult Post(UserInfoDto dto)
        {
            this._userInfoService.UpdateAccount(new UserInfo().ConvertFromDtoModel(dto));
            UserStatuService.LoginedUsers.Where(item => item.Value.Id == dto.Id).FirstOrDefault().Value.AuditStatus = AuditStatusEnum.OnAuditing;
            return Ok();
        }

        [HttpPut]
        public IActionResult Put(UserInfoDto userInfo)
        {
            Ensure.NotNull(userInfo, nameof(userInfo));
            Ensure.NotContainsSensitiveWord(userInfo.NickName, nameof(userInfo.NickName));

            this._userInfoService.Update(new UserInfo().ConvertFromDtoModel(userInfo));
            return Ok();
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        [Route("/api/userinfo/getauditing")]
        public IActionResult GetAuditingInfo()
        {
            return new JsonResult(this._userInfoService.GetAuditingDto(base.CurrentUser.Id));
        }


    }
}