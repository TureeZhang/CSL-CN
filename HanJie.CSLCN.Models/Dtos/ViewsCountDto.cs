using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class ViewsCountDto
    {
        /// <summary>
        /// 新增浏览数量
        /// </summary>
        public int NewViews;

        /// <summary>
        /// 最后一次记录有效访问的时间（用于帮助判断同IP是否新增浏览数）
        /// </summary>
        public DateTime LastUpdateTime;
    }
}
