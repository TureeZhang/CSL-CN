using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HanJie.CSLCN.Services
{
    public class UserStatuService : BaseService<UserInfoDto, UserInfo>, IUserStatuService
    {
        public static Dictionary<string, UserInfoDto> LoginedUsers { get; set; } = new Dictionary<string, UserInfoDto>();

        public UserStatuService(CSLDbContext cslDbContext, ICommonHelper commonHelper)
            : base(cslDbContext, commonHelper)
        {

        }


        public void LoginSuccess(UserInfoDto userInfo)
        {
            if (userInfo == null)
            {
                throw new ArgumentNullException(nameof(userInfo));
            }
            if (string.IsNullOrEmpty(userInfo.StatusMarkGuid))
            {
                throw new ArgumentNullException(nameof(userInfo.StatusMarkGuid));
            }
            if (LoginedUsers.ContainsKey(userInfo.StatusMarkGuid))
            {
                return;
            }

            Login(userInfo);
        }

        private void Login(UserInfoDto userInfo)
        {
            LoginedUsers.Add(userInfo.StatusMarkGuid, userInfo);
        }

        public void LogoutSuccess(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentNullException(nameof(id));
            }

            Logout(id);
        }


        private void Logout(int id)
        {
            List<string> logoutUserCookies = UserStatuService.LoginedUsers.Where(item => item.Value.Id == id).Select(keyValuePair => keyValuePair.Key.ToString()).ToList();
            foreach (string item in logoutUserCookies)
            {
                UserStatuService.LoginedUsers.Remove(item);
            }
        }
    }
}
