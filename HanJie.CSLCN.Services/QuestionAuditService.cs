using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class QuestionAuditService : BaseService<QuestionDto, Question>, IQuestionAuditService
    {
        public QuestionAuditService(CSLDbContext cslDbContext, ICommonHelper commonHelper) :
            base(cslDbContext, commonHelper)
        {

        }

        public  void Rejected(int id, string reason, int auditorUserId)
        {
            Ensure.IsDatabaseId(id, nameof(id));
            Ensure.NotNull(reason, nameof(reason));
            Ensure.IsDatabaseId(auditorUserId, nameof(auditorUserId));

            Question question =  GetById(id);
            question.Status = QuestionStatusEnum.AuditRejected;
            question.AuditRejectedReason = reason;
            question.AuditorUserId = auditorUserId;

            throw new NotImplementedException();
        }

        public  void AuditOK(int id, int auditorUserId)
        {
            Ensure.IsDatabaseId(id, nameof(id));
            Ensure.IsDatabaseId(auditorUserId, nameof(auditorUserId));

            Question question =  GetById(id);
            question.Status = QuestionStatusEnum.AuditOK;
            question.AuditorUserId = auditorUserId;
             base.Update(question);
        }
    }
}
