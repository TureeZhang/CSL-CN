using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class MenuItemDto
    {
        /// <summary>
        /// 菜单项名称
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 组件路由
        /// </summary>
        public string Path { get; set; }
    }
}
