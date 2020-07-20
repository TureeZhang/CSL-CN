using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class SystemSetting : BaseDataModel<SystemSetting, SystemSettingDto>
    {
        public SystemSettingTypeEnum Type { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
