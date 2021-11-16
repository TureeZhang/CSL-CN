using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using HanJie.CSLCN.Models.Enums;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {

        private IUserInfoService _userInfoService { get; set; }

        public LoginController(IUserInfoService userInfoService)
        {
            _userInfoService = userInfoService;
        }

        /// <summary>
        /// 用户登录校验。
        /// </summary>
        /// <param name="userInfoDto"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Post([FromBody] UserInfoDto userInfo)
        {
            try
            {
                //如果是使用 Cookie 恢复登录状态，装载数据传输模型。
                if (userInfo == null && Request.Cookies.ContainsKey(StringTagEnum.CurrentLoginedUserGuid))
                {
                    userInfo = new UserInfoDto { StatusMarkGuid = Request.Cookies[StringTagEnum.CurrentLoginedUserGuid] };
                }

                UserInfoDto result = this._userInfoService.UserLoginAutoHandler(userInfo);
                if (result != null && !string.IsNullOrEmpty(result.StatusMarkGuid))
                {
                    base.Response.Cookies.Append(StringTagEnum.CurrentLoginedUserGuid, result.StatusMarkGuid);
                    return new JsonResult(result);
                }

                return new JsonResult(new UserInfoDto { IsLoginSuccess = false });
            }
            catch (UnauthorizedAccessException)
            {
                return new JsonResult(new UserInfoDto { IsLoginSuccess = false });
            }
        }

        /// <summary>
        /// 新用户注册。
        /// </summary>
        /// <param name="userInfoDto"></param>
        /// <returns></returns>
        [HttpPut]
        public JsonResult Put(UserInfoDto userInfoDto)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 用户登出
        /// </summary>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        [HttpDelete]
        public void Delete(int id)
        {
            this._userInfoService.Logout(id);
        }
    }
}
