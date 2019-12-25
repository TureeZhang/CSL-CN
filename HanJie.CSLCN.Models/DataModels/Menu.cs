using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class Menu : BaseDataModel<Menu, MenuDto>
    {
        /// <summary>
        /// 菜单类别（主分类或子菜单）
        /// </summary>
        [Required]
        public MenuTypeEnum MenuType { get; set; }
        /// <summary>
        /// 菜单(或分类)名称
        /// </summary>
        [Required]
        public string Name { get; set; }
        /// <summary>
        /// 父级分类ID
        /// </summary>
        [Required]
        public int ParentId { get; set; }
        /// <summary>
        /// 图标类型
        /// </summary>
        public string IconType { get; set; }
        /// <summary>
        /// 组件路由
        /// </summary>
        public string Path { get; set; }
    }
}
