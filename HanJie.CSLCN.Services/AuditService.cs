using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;

namespace HanJie.CSLCN.Services
{
    public class AuditService : IAuditService
    {
        private readonly IUserInfoService _userInfoService;
        private readonly CSLDbContext _cslDbContext;

        public AuditService(IUserInfoService userInfoService,CSLDbContext cslDbContext)
        {
            this._userInfoService = userInfoService;
            this._cslDbContext = cslDbContext;
        }

        public async Task<UserInfo> ConfirmUser(int userId)
        {
            UserInfo userInfo = await this._userInfoService.GetById(userId);
            userInfo.AuditStatus =  AuditStatusEnum.OK;

            await this._userInfoService.UpdateAsync(userInfo);
            return userInfo;
        }

        public async Task RejectUser(int userId, string reason)
        {
            UserInfo user =await this._userInfoService.GetById(userId);
            user.AuditStatus = AuditStatusEnum.Rejected;
            user.AuditRejectedReason = reason;

            await this._userInfoService.UpdateAsync(user);
        }
    }
}
