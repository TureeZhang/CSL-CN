using System.Collections.Generic;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IAuditService
    {
        UserInfo ConfirmUser(int userId);
        void RejectUser(int userId, string reason);
        
        List<WikiPassageCommentDto> ListOnAuditingWikiComments();
        void ConfirmWikiComment(int id);
        void RejectComment(int id, string reason);
    }
}