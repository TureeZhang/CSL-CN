using System.Collections.Generic;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IUserInfoService
    {
        Task<UserInfo> AddAsync(UserInfo userInfo);
        Task<IEnumerable<DonatorRankDto>> BindDonatorUserInfo(params DonatorRankDto[] dtos);
        Task<List<UserInfoDto>> CollectAuthorInfoes(string[] userIds);
        Task<bool> IsUserNameDuplicated(string userName);
        Task<List<UserInfo>> ListAllEditors();
        Task<List<UserInfoDto>> ListDtoes();
        Task<List<UserInfoAuditDto>> ListUnAuditorUsersInfo();
        Task<List<UserInfoDto>> ListEditorsDto(int countRecentDays = -1);
        Task<List<UserInfo>> ListRecentActiveEditors(int recentDaysCount = 0);
        void Logout(int id);
        Task UpdateLastCommitInfo(int id);
        UserInfoDto UserLoginAutoHandler(UserInfoDto userInfo);
        Task<UserInfo> GetById(int id);
        Task UpdateAsync(UserInfo userInfo);
        Task<UserInfoDto> RegisterNewUser(UserInfoDto userInfoDto, string userInputSmsCode);
        Task UpdateAccount(UserInfo userInfo);
        bool IsNickNameExists(string nickName);
        UserInfoAuditDto GetAuditingDto(int userId);
        UserInfoAudit GetAuditingData(int userId);
        bool IsPhoneNumberExist(string phoneNumber);
    }
}