using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Extensions.DependencyInjection;

namespace HanJie.CSLCN.Services
{
    public partial class UserInfoService : BaseService<UserInfoDto, UserInfo>
    {
        private UserStatuService _userStatuService;

        public UserInfoService()
        {
            this._userStatuService = base.GetService<UserStatuService>();
        }

        public virtual UserInfoDto UserLoginAutoHandler(UserInfoDto userInfo)
        {
            if (userInfo == null)
            {
                return new UserInfoDto { IsLoginSuccess = false };
            }
            if ((string.IsNullOrEmpty(userInfo.UserName) || string.IsNullOrEmpty(userInfo.Password))
                && string.IsNullOrEmpty(userInfo.StatusMarkGuid))
            {
                throw new ArgumentNullException("用户名密码或标记登录状态的 cookie 值必须二选其一，不能同时为空。");
            }

            if (!string.IsNullOrEmpty(userInfo.UserName) && !string.IsNullOrEmpty(userInfo.Password))
            {
                return Login(userInfo);
            }
            else
            {
                return ResotreLoginStatus(userInfo.StatusMarkGuid);
            }


        }

        private UserInfoDto ResotreLoginStatus(string cookieGuid)
        {
            if (string.IsNullOrEmpty(cookieGuid))
            {
                throw new ArgumentException("message", nameof(cookieGuid));
            }

            UserInfoDto userInfoDto = new UserInfoDto { IsLoginSuccess = false };
            if (UserStatuService.LoginedUsers.TryGetValue(cookieGuid, out userInfoDto))
            {
                return userInfoDto;
            }

            return userInfoDto;
        }

        private UserInfoDto Login(UserInfoDto userInfoDto)
        {
            if (string.IsNullOrEmpty(userInfoDto.UserName))
                throw new ArgumentException("用户名是必须的", nameof(userInfoDto.UserName));

            if (string.IsNullOrEmpty(userInfoDto.Password))
                throw new ArgumentException("密码是必须的", nameof(userInfoDto.Password));

            UserInfoDto result = new UserInfoDto();
            bool isValidateSuccess = ValidateUserPasswordIsCorrect(userInfoDto.UserName, userInfoDto.Password);
            if (isValidateSuccess)
            {
                result = GetByUserName(userInfoDto.UserName);
                result.IsLoginSuccess = true;
                result.StatusMarkGuid = Guid.NewGuid().ToString();
                this._userStatuService.LoginSuccess(result);
            }
            else
            {
                result = userInfoDto;
                result.IsLoginSuccess = false;
            }

            return result;
        }

        public void Logout(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentNullException(nameof(id));
            }

            this._userStatuService.LogoutSuccess(id);
        }

        /// <summary>
        /// 校验用户密码是否正确。
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        private bool ValidateUserPasswordIsCorrect(string userName, string password)
        {
            bool result = false;

            UserInfo userInfo = CSLDbContext.UserInfoes.Where(u => u.UserName == userName).FirstOrDefault();
            if (userInfo == null)
                throw new UnauthorizedAccessException($"JSHC：用户名 {userName} 不存在。");

            string actualPasswordMd5Base64String = base.CommonHelper.GetMd5Base64StringUsePrivateSold(password);
            result = actualPasswordMd5Base64String == userInfo.Password;

            return result;
        }

        /// <summary>
        /// 根据用户名获取用户信息
        /// </summary>
        /// <param name="userName">用户名</param>
        /// <returns>用户信息</returns>
        private UserInfoDto GetByUserName(string userName)
        {
            if (string.IsNullOrEmpty(userName))
                throw new ArgumentNullException("userName 是必须的。");


            UserInfoDto result = null;
            UserInfo userInfo = CSLDbContext.UserInfoes.Where(u => u.UserName == userName).FirstOrDefault();
            result = new UserInfoDto().ConvertFromDataModel(userInfo);

            return result;
        }
    }
}
