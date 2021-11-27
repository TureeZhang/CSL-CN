using System;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using HanJie.CSLCN.Models.MyExceptions;

namespace HanJie.CSLCN.Services
{
    public class WikiPassageCommentService : BaseService<WikiPassageCommentDto, WikiPassageComment>, IWikiPassageCommentService
    {
        private readonly ISensitiveWordHelper _sensitiveWordHelper;

        public WikiPassageCommentService(CSLDbContext cslDbContext,
            ICommonHelper commonHelper,
            ISensitiveWordHelper sensitiveWordHelper)
            : base(cslDbContext, commonHelper)
        {
            this._sensitiveWordHelper = sensitiveWordHelper;
        }

        public void Create(WikiPassageCommentDto comment)
        {
            Ensure.NotNull(comment, nameof(comment));
            Ensure.NotNull(comment.Content, comment.Content);
            Ensure.IsDatabaseId(comment.User.Id, nameof(comment.User.Id));
            Ensure.IsDatabaseId(comment.WikiPassageId, nameof(comment.WikiPassageId));

            if (this._sensitiveWordHelper.IsContainsSensitiveWord(comment.Content))
                throw new UserException("评论中包含敏感词，请调整后重试。");

            WikiPassageComment data = Mapper.Map<WikiPassageComment>(comment);
            data.AuditStatus = AuditStatusEnum.OnAuditing;
            data.CreateDate = DateTime.Now;
            data.LastModifyDate = DateTime.Now;
            base.CSLDbContext.WikiPassageComments.Add(data);
            base.CSLDbContext.SaveChanges();
        }

        public void Delete(int id, int currentUserId)
        {
            Ensure.IsDatabaseId(id, nameof(id));

            WikiPassageComment comment = base.GetById(id);
            if (comment.UserId != currentUserId)
                throw new Exception("评论的发布者与删除操作用户不一致，无权删除。");

            //todo: 管理员删除评论需要开另外的方法，这个方法是提供给普通用户调用的。

            base.DeleteById(id);
        }
    }
}
