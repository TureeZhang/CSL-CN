using System.Collections.Generic;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IAuditService
    {
        Task<UserInfo> ConfirmUser(int userId);
        Task RejectUser(int userId, string reason);
    }
}