using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Enums
{
    public enum QuestionStatusEnum
    {
        /// <summary>
        /// 等待审核
        /// </summary>
        WaitAudit,

        /// <summary>
        /// 审核通过
        /// </summary>
        AuditOK,

        /// <summary>
        /// 审核被拒绝
        /// </summary>
        AuditRejected,

        /// <summary>
        /// 已删除
        /// </summary>
        Deleted
    }
}
