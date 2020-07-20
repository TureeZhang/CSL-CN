using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class SystemSettingDto : BaseDtoModel<SystemSettingDto, SystemSetting>
    {
        public SystemSettingTypeEnum Type { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
