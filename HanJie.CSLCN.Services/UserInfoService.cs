using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using HanJie.CSLCN.Common;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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

        public virtual List<UserInfoDto> ListDtoes()
        {
            List<UserInfo> datas = base.List();
            List<UserInfoDto> dtos = new List<UserInfoDto>();
            foreach (UserInfo item in datas)
            {
                UserInfoDto dto = new UserInfoDto().ConvertFromDataModel(item);
                dto.Password = null;
                dto.LastCommitDateTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                dtos.Add(dto);
            }

            return dtos;
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

        public override async Task<UserInfo> AddAsync(UserInfo userInfo)
        {
            Ensure.NotNull(userInfo, nameof(userInfo));
            Ensure.NotNull(userInfo.IsAdmin, nameof(userInfo.IsAdmin));
            Ensure.NotNull(userInfo.NickName, nameof(userInfo.NickName));
            Ensure.NotNull(userInfo.Password, nameof(userInfo.Password));
            Ensure.NotNull(userInfo.UserName, nameof(userInfo.UserName));
            Ensure.NotNull(userInfo.AvatarUrl, nameof(userInfo.AvatarUrl));

            userInfo.Password = new CommonHelper().GetMd5Base64StringUsePrivateSold(userInfo.Password);
            userInfo.PersonalHomepageUrl = string.IsNullOrWhiteSpace(userInfo.PersonalHomepageUrl) ? null : userInfo.PersonalHomepageUrl;
            userInfo.DescriptionWord = string.IsNullOrEmpty(userInfo.DescriptionWord) ? "这个刁民太懒了，什么都没有写。" : userInfo.DescriptionWord;

            UserInfo result = await base.AddAsync(userInfo);
            return result;

        }

        public bool IsUserNameDuplicated(string userName)
        {
            Ensure.NotNull(userName, nameof(userName));

            UserInfo userInfo = this.CSLDbContext.UserInfoes.Where(item => item.UserName == userName).FirstOrDefault();
            if (userInfo == null)
                return false;

            return true;
        }

        public IEnumerable<DonatorRankDto> BindDonatorUserInfo(params DonatorRankDto[] dtos)
        {
            foreach (DonatorRankDto item in dtos)
            {
                UserInfo user = this.GetById(item.UserId);
                item.UserNickName = user.NickName;
                item.AvatarUrl = user.AvatarUrl;
                item.PersonalHomepageUrl = user.PersonalHomepageUrl;
                item.PersonalTitle = user.PersonalTitle ?? "-";
                item.DescriptionWord = user.DescriptionWord ?? "这个刁民太懒了，什么都没写。";
            }

            return dtos;
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

        public List<UserInfoDto> CollectAuthorInfoes(string[] userIds)
        {
            Ensure.NotNull(userIds, nameof(userIds));

            List<UserInfoDto> result = new List<UserInfoDto>();
            foreach (string item in userIds)
            {
                UserInfo userInfo = GetById(Convert.ToInt32(item));
                UserInfoDto dto = new UserInfoDto().ConvertFromDataModel(userInfo);
                result.Add(dto);
            }

            return result;
        }

        /// <summary>
        /// 更新最后一次提交的信息。
        /// 
        /// 注意：
        ///     调用此方法同时执行了：
        ///     1.提交次数累计加一；
        ///     2.最后活跃时间更新为现在。
        /// </summary>
        /// <param name="id"></param>
        public virtual async void UpdateLastCommitInfo(int id)
        {
            Ensure.IsDatabaseId(id, nameof(id));

            UserInfo userInfo = GetById(id);
            userInfo.CommitTimesCount += 1;
            userInfo.LastCommitDateTime = DateTime.Now;
            await UpdateAsync(userInfo);
        }

        public virtual async Task<List<UserInfo>> ListAllEditors()
        {
            List<UserInfo> editors = await this.CSLDbContext.UserInfoes.Where(item => item.IsAdmin).ToListAsync();
            return editors;
        }

        public virtual async Task<List<UserInfoDto>> ListAllEditorsDto()
        {
            List<UserInfoDto> results = null;
            List<UserInfo> userInfoes = await ListAllEditors();

            if (userInfoes == null)
                return null;

            foreach (UserInfo item in userInfoes)
            {
                UserInfoDto dto = new UserInfoDto().ConvertFromDataModel(item);
                dto.Password = null;
                dto.LastCommitDateTime = item.LastCommitDateTime.ToString("yyyy-MM-dd HH:mm:ss");
                results.Add(dto);
            }

            return results;
        }
    }
}
