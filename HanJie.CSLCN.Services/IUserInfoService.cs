using System.Collections.Generic;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IUserInfoService
    {
        UserInfo Add(UserInfo userInfo);
        IEnumerable<DonatorRankDto> BindDonatorUserInfo(params DonatorRankDto[] dtos);
        List<UserInfoDto> CollectAuthorInfoes(string[] userIds);
        UserInfoAudit GetAuditingData(int userId);
        UserInfoAuditDto GetAuditingDto(int userId);
        bool IsNickNameExists(string nickName);
        bool IsPhoneNumberExist(string phoneNumber);
        bool IsUserNameDuplicated(string userName);
        List<UserInfo> ListAllEditors();
        List<UserInfoDto> ListDtoes();
        List<UserInfoDto> ListEditorsDto(int countRecentDays = -1);
        List<UserInfo> ListRecentActiveEditors(int recentDaysCount = 0);
        List<UserInfoAuditDto> ListUnAuditorUsersInfo();
        void Logout(int id);
        UserInfoDto RegisterNewUser(UserInfoDto userInfoDto, string userInputSmsCode);
        void Update(UserInfo data);
        void UpdateAccount(UserInfo data);
        void UpdateLastCommitInfo(int id);
        UserInfoDto UserLoginAutoHandler(UserInfoDto userInfo);
        UserInfo GetById(int id);
    }
}