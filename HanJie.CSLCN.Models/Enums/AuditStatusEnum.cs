using System;
namespace HanJie.CSLCN.Models.Enums
{
    public enum AuditStatusEnum
    {
        /// <summary>
        /// 通过
        /// </summary>
        OK = 0,

        /// <summary>
        /// 审核中
        /// </summary>
        OnAuditing = 10,

        /// <summary>
        /// 已拒绝
        /// </summary>
        Rejected = 20
    }
}
