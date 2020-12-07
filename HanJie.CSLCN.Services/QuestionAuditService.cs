using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class QuestionAuditService : BaseService<QuestionDto, Question>
    {
        public async Task Rejected(int id, string reason, int auditorUserId)
        {
            Ensure.IsDatabaseId(id, nameof(id));
            Ensure.NotNull(reason, nameof(reason));
            Ensure.IsDatabaseId(auditorUserId, nameof(auditorUserId));

            Question question = await GetById(id);
            question.Status = QuestionStatusEnum.AuditRejected;
            question.AuditRejectedReason = reason;
            question.AuditorUserId = auditorUserId;

            throw new NotImplementedException();
        }

        public async Task AuditOK(int id, int auditorUserId)
        {
            Ensure.IsDatabaseId(id, nameof(id));
            Ensure.IsDatabaseId(auditorUserId, nameof(auditorUserId));

            Question question = await GetById(id);
            question.Status = QuestionStatusEnum.AuditOK;
            question.AuditorUserId = auditorUserId;
            await base.UpdateAsync(question);
        }
    }
}
