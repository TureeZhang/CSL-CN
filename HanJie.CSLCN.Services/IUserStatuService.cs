using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IUserStatuService
    {
        void LoginSuccess(UserInfoDto userInfo);
        void LogoutSuccess(int id);
    }
}