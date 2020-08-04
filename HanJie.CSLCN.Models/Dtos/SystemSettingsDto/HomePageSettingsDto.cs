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


        public string MenuBackgroundColor { get; set; }
        public string MenuSecondaryBackgroundColor { get; set; }
        public string MenuBackgroundFocusColor { get; set; }
        public string MenuTextFocusColor { get; set; }
        
        public string MenuGroupTextColor { get; set; }
        public string MenuGroupTextHoverColor { get; set; }
        public string MenuSecondaryTextColor { get; set; }
        public string MenuSecondaryTextHoverColor { get; set; }
        public string HeaderBoardBackgroundColor { get; set; }
        public string HeaderBoardTextColor { get; set; }
        public string LittleBoardTitleTextColor { get; set; }
        public string LittleBoardBackgroundColor { get; set; }

        public string FriendlyWebsiteUrls { get; set; }
        public string OutsideMediaLinkText { get; set; }
        public string OutsideMediaLinkUrl { get; set; }


    }
}
