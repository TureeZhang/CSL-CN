using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using HanJie.CSLCN.Common;
using Microsoft.EntityFrameworkCore;
using HanJie.CSLCN.Models.Enums;
using HanJie.CSLCN.Models.Consts;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.MyExceptions;

namespace HanJie.CSLCN.Services
{
    public partial class UserInfoService : BaseService<UserInfoDto, UserInfo>, IUserInfoService
    {
        private readonly ISystemSettingService _systemSettingService;
        private readonly IUserStatuService _userStatuService;
        private readonly IValidateCodeService _validateCodeService;

        public UserInfoService(
            ISystemSettingService systemSettingService,
            IUserStatuService userStatuService,
            CSLDbContext cslDbContext,
            ICommonHelper commonHelper,
            IValidateCodeService humanMachineValidateService
            )
            : base(cslDbContext, commonHelper)
        {
            this._systemSettingService = systemSettingService;
            this._userStatuService = userStatuService;
            this._validateCodeService = humanMachineValidateService;
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

        public List<UserInfoAuditDto> ListUnAuditorUsersInfo()
        {
            List<int> unAuditUserIds = base.CSLDbContext.UserInfoes.Where(user => user.AuditStatus == AuditStatusEnum.OnAuditing).Select(user => user.Id).ToList();
            List<UserInfoAudit> unAuditorUserInfoes = base.CSLDbContext.UserInfoAudits.Where(user => unAuditUserIds.Contains(user.Id)).ToList();

            List<UserInfoAuditDto> results = new List<UserInfoAuditDto>();
            foreach (var item in unAuditorUserInfoes)
            {
                results.Add(new UserInfoAuditDto().ConvertFromDataModel(item));
            }

            return results;
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

        public new UserInfo Add(UserInfo userInfo)
        {
            Ensure.NotNull(userInfo, nameof(userInfo));
            Ensure.NotNull(userInfo.IsAdmin, nameof(userInfo.IsAdmin));
            Ensure.NotNull(userInfo.NickName, nameof(userInfo.NickName));
            Ensure.NotNull(userInfo.Password, nameof(userInfo.Password));
            Ensure.NotNull(userInfo.UserName, nameof(userInfo.UserName));

            if (string.IsNullOrEmpty(userInfo.AvatarUrl))
                userInfo.AvatarUrl = this._systemSettingService.Get(SystemSettingTypeEnum.UserSettings, SystemSettingsNameStringConsts.DefaultUserAvatarUrl).Value;

            userInfo.Password = new CommonHelper().GetMd5Base64StringUsePrivateSold(userInfo.Password);
            userInfo.PersonalHomepageUrl = string.IsNullOrWhiteSpace(userInfo.PersonalHomepageUrl) ? null : userInfo.PersonalHomepageUrl;
            userInfo.DescriptionWord = string.IsNullOrEmpty(userInfo.DescriptionWord) ? "这个刁民太懒了，什么都没有写。" : userInfo.DescriptionWord;

            userInfo.CreateDate = DateTime.Now;
            userInfo.LastModifyDate = DateTime.Now;

            UserInfo result = base.Add(userInfo);
            return result;

        }

        public bool IsUserNameDuplicated(string userName)
        {
            Ensure.NotNull(userName, nameof(userName));

            UserInfo userInfo = CSLDbContext.UserInfoes.Where(item => item.UserName == userName).AsQueryable().FirstOrDefault();
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
        public virtual void UpdateLastCommitInfo(int id)
        {
            Ensure.IsDatabaseId(id, nameof(id));

            UserInfo userInfo = GetById(id);
            userInfo.CommitTimesCount += 1;
            userInfo.LastCommitDateTime = DateTime.Now;
            Update(userInfo);
        }

        public virtual List<UserInfo> ListRecentActiveEditors(int recentDaysCount = 0)
        {
            List<UserInfo> editors = null;
            if (recentDaysCount <= 0)
            {
                editors = CSLDbContext.UserInfoes.Where(item => item.IsAdmin).ToList();
            }
            else
            {
                editors = CSLDbContext.UserInfoes
                    .Where(item => item.IsAdmin && DateTime.Now.AddDays(-recentDaysCount) <= item.LastCommitDateTime)
                    .OrderByDescending(item => item.LastCommitDateTime)
                    .ToList();
            }

            return editors;

        }

        public virtual List<UserInfo> ListAllEditors()
        {
            return ListRecentActiveEditors(-1);
        }

        public virtual List<UserInfoDto> ListEditorsDto(int countRecentDays = -1)
        {
            List<UserInfoDto> results = new List<UserInfoDto>();
            List<UserInfo> userInfoes = ListRecentActiveEditors(countRecentDays);

            if (userInfoes == null)
                return null;

            foreach (UserInfo item in userInfoes)
            {
                UserInfoDto dto = new UserInfoDto().ConvertFromDataModel(item);
                dto.Password = null;
                if (item.LastCommitDateTime != null)
                    dto.LastCommitDateTime = item.LastCommitDateTime.Value.ToString("yyyy-MM-dd HH:mm:ss");
                results.Add(dto);
            }

            return results;
        }

        public UserInfoDto RegisterNewUser(UserInfoDto userInfoDto, string userInputSmsCode)
        {
            Ensure.NotNull(userInfoDto, nameof(userInfoDto));
            Ensure.NotNull(userInfoDto.PhoneNumber, nameof(userInfoDto.PhoneNumber));

            bool isValidatePhone = this._validateCodeService.IsSmsCodeEqual(userInfoDto.PhoneNumberPrefix + userInfoDto.PhoneNumber, userInputSmsCode);
            if (!isValidatePhone)
                throw new UserException($"发往 {userInfoDto.PhoneNumber} 的手机验证码核对有误，验证失败。请正确输入短信中包含的验证码，然后重试。");

            userInfoDto.AuditStatus = AuditStatusEnum.OnAuditing;
            UserInfo userInfo = new UserInfo().ConvertFromDtoModel(userInfoDto);
            userInfo.PhoneNumber = userInfo.PhoneNumber;
            userInfo.CreateDate = DateTime.Now;
            userInfo.LastModifyDate = DateTime.Now;
            userInfo.Password = this.CommonHelper.GetMd5Base64StringUsePrivateSold(userInfo.Password);
            Add(userInfo);

            return userInfoDto;
        }

        public void UpdateAccount(UserInfo data)
        {
            UserInfo userToUpdate = base.GetById(data.Id);

            if (string.IsNullOrEmpty(data.AvatarUrl))
                data.AvatarUrl = userToUpdate.AvatarUrl;

            CacheUserNewInfoes(Mapper.Map<UserInfoAudit>(data));
            userToUpdate.AuditStatus = AuditStatusEnum.OnAuditing;

            Update(userToUpdate);
        }

        private void CacheUserNewInfoes(UserInfoAudit data)
        {
            List<UserInfoAudit> existCaches = this.CSLDbContext.UserInfoAudits.Where(item => item.UserId == data.UserId).ToList();

            foreach (var item in existCaches)
            {
                this.CSLDbContext.Remove(item);
                this.CSLDbContext.SaveChanges();
            }

            this.CSLDbContext.UserInfoAudits.Add(data);
            this.CSLDbContext.SaveChanges();
        }

        public override void Update(UserInfo data)
        {
            Ensure.IsDatabaseId(data.Id, nameof(data.Id));

            data.LastModifyDate = DateTime.Now;

            base.CSLDbContext.UserInfoes.Update(data);
            base.CSLDbContext.SaveChanges();
        }

        public bool IsNickNameExists(string nickName)
        {
            UserInfo user = base.CSLDbContext.UserInfoes.Where(item => string.Equals(nickName, item.NickName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();

            bool isExists = user != null;
            return isExists;
        }

        public UserInfoAuditDto GetAuditingDto(int userId)
        {
            return Mapper.Map<UserInfoAuditDto>(GetAuditingData(userId));
        }

        public UserInfoAudit GetAuditingData(int userId)
        {
            return base.CSLDbContext.UserInfoAudits.Find(userId);
        }

        public bool IsPhoneNumberExist(string phoneNumber)
        {
            Ensure.NotNull(phoneNumber, nameof(phoneNumber));

            UserInfo user = this.CSLDbContext.UserInfoes.Where(user => user.PhoneNumber == phoneNumber).FirstOrDefault();

            if (user != null)
                return true;

            return false;
        }

    }
}
