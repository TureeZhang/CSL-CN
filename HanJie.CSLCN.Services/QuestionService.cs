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
    public class QuestionService : BaseService<QuestionDto, Question>
    {
        public QuestionService(CSLDbContext cslDbContext,ICommonHelper commonHelper)
            :base(cslDbContext,commonHelper)
        {

        }

        /// <summary>
        /// 获取审核通过的问题
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Question GetAudited(int id)
        {
            Ensure.IsDatabaseId(id, nameof(id));
            throw new NotImplementedException();
        }

        /// <summary>
        /// 获取等待审核的问题
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Question GetWaitAudit(int id)
        {
            Ensure.IsDatabaseId(id, nameof(id));
            throw new NotImplementedException();
        }

        /// <summary>
        /// 创建新问题
        /// </summary>
        /// <param name="question"></param>
        /// <returns></returns>
        public void Create(Question question)
        {
            Ensure.NotNull(question, nameof(question));

            question.Status = QuestionStatusEnum.WaitAudit;
             base.Add(question);
        }
    }
}
