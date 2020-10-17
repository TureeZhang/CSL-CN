using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos.SystemSettingsDto
{
    public class HomePageSettingsDto
    {
        public string WebsiteName { get; set; }
        public string WebsiteDescription { get; set; }
        public string WebsiteRecordNumber { get; set; }
        public string MainLogoPath { get; set; }
        public string HomepageLogoPath { get; set; }

        
        public string BoardTitleA { get; set; }
        public string BoardTitleB { get; set; }
        public string BoardTitleC { get; set; }
        public string BoardTitleD { get; set; }
        public string BoardTitleE { get; set; }
        public string BoardTitleF { get; set; }
        
        public string BoardContentB { get; set; }
        public string BoardContentC { get; set; }
        public string BoardContentD { get; set; }

        /// <summary>
        /// 菜单栏背景色
        /// </summary>
        public string MenuBackgroundColor { get; set; }
        /// <summary>
        /// 菜单组子项背景色
        /// </summary>
        public string MenuGroupitemBackgroundColor { get; set; }
        /// <summary>
        /// 菜单选中文字色
        /// </summary>
        public string MenuTextFocusColor { get; set; }
        /// <summary>
        /// 菜单选中背景色
        /// </summary>
        public string MenuBackgroundFocusColor { get; set; }
        /// <summary>
        /// 菜单文字色
        /// </summary>
        public string MenuTextColor{ get; set; }
        /// <summary>
        /// 菜单组文字色
        /// </summary>
        public string MenuGroupTextColor { get; set; }
        /// <summary>
        /// 悬停色
        /// </summary>
        public string MenuHoverColor { get;set; }
        /// <summary>
        /// 悬停背景色
        /// </summary>
        public string MenuHoverBackgroundColor { get; set; }

        public string HeaderBoardTextColor { get; set; }
        public string HeaderBoardBackgroundColor { get; set; }
        public string LittleBoardTitleTextColor { get; set; }
        public string LittleBoardBackgroundColor { get; set; }

        public string FriendlyWebsiteUrls { get; set; }
        public string OutsideMediaLinkText { get; set; }
        public string OutsideMediaLinkUrl { get; set; }

        /// <summary>
        /// 首页布局风格
        /// </summary>
        public string LayoutStyle { get; set; }
    }
}
