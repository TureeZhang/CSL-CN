using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;

namespace HanJie.CSLCN.Services
{
    public class AuditService : IAuditService
    {
        private readonly IQiniuService _qiniuService;
        private readonly IUserInfoService _userInfoService;
        private readonly CSLDbContext _cslDbContext;

        public AuditService(IQiniuService qiniuService,
            IUserInfoService userInfoService,
            CSLDbContext cslDbContext)
        {
            this._qiniuService = qiniuService;
            this._userInfoService = userInfoService;
            this._cslDbContext = cslDbContext;
        }

        public  UserInfo ConfirmUser(int userId)
        {
            UserInfo userInfo = this._userInfoService.GetById(userId);
            UserInfoAudit userInfoAuditCache = this._cslDbContext.UserInfoAudits.Where(item => item.UserId == userId).FirstOrDefault();

            //需要确认头像是否出现更新，如果出现更新，需要覆盖正在使用的图片。
            //用户头像的命名规则是 "user{id}"，如果是更新的图片，则暂以 _new 后缀结尾
            string newAvatarUrl = null;
            if (!string.Equals(userInfo.AvatarUrl, userInfoAuditCache.AvatarUrl, StringComparison.OrdinalIgnoreCase))
            {
                 this._qiniuService.DeleteFile(new Uri(userInfo.AvatarUrl).PathAndQuery);
                newAvatarUrl = userInfoAuditCache.AvatarUrl.Remove("_new");
                 this._qiniuService.ReNameFile(new Uri(userInfoAuditCache.AvatarUrl).PathAndQuery, newAvatarUrl);
            }

            userInfo.AvatarUrl = newAvatarUrl ?? userInfo.AvatarUrl;
            userInfo.NickName = userInfoAuditCache.NickName;
            userInfo.PersonalHomepageUrl = userInfoAuditCache.PersonalHomepageUrl;
            userInfo.PersonalizedSignature = userInfoAuditCache.PersonalizedSignature;
            userInfo.AuditStatus = AuditStatusEnum.OK;

             this._userInfoService.Update(userInfo);

            return userInfo;
        }

        public void RejectUser(int userId, string reason)
        {
            Ensure.NotNull(reason, nameof(reason));

            UserInfo user =  this._userInfoService.GetById(userId);
            user.AuditStatus = AuditStatusEnum.Rejected;
            UserInfoAudit userAudit = this._userInfoService.GetAuditingData(userId);
            userAudit.AuditRejectedReason = reason;

            this._cslDbContext.Update(user);
            this._cslDbContext.Update(userAudit);
             this._cslDbContext.SaveChanges();

            UserStatuService.LoginedUsers.Where(item => item.Value.Id == userId).FirstOrDefault().Value.AuditStatus = AuditStatusEnum.Rejected;
        }

        public List<WikiPassageCommentDto> ListOnAuditingWikiComments()
        {
            List<WikiPassageCommentDto> results = new List<WikiPassageCommentDto>();

            List<WikiPassageComment> datas = this._cslDbContext.WikiPassageComments.Where(item => item.AuditStatus == AuditStatusEnum.OnAuditing).ToList();
            foreach (WikiPassageComment item in datas)
            {
                WikiPassageCommentDto dto = Mapper.Map<WikiPassageCommentDto>(item);
                dto.User =Mapper.Map<UserInfoDto>( this._userInfoService.GetById(item.UserId));

                results.Add(dto);
            }
            

            return results;
        }

        public  void ConfirmWikiComment(int id)
        {
            Ensure.IsDatabaseId(id, nameof(id));

            WikiPassageComment comment = this._cslDbContext.WikiPassageComments.Find(id);
            comment.AuditStatus = AuditStatusEnum.OK;

            this._cslDbContext.Update(comment);
             this._cslDbContext.SaveChanges();
        }

        public  void RejectComment(int id,string reason)
        {
            WikiPassageComment comment = this._cslDbContext.WikiPassageComments.Find(id);
            comment.AuditRejectReason = reason;
            comment.AuditStatus = AuditStatusEnum.Rejected;

            //todo:消息中心上线后，通知发布人，评论审核被拒绝及其原因。

            this._cslDbContext.WikiPassageComments.Update(comment);
             this._cslDbContext.SaveChanges();
        }
    }
}
