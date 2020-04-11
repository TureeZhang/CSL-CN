using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class SystemSettings : BaseDataModel<SystemSettings, SystemSettingsDto>
    {
        public string Name { get; set; }
        public string Value { get; set; }

        public override SystemSettings ConvertFromDtoModel(SystemSettingsDto dtoModel)
        {
            throw new NotImplementedException("系统设置项结构特殊，此方法无法调用。获取设置选项请直接调用 SystemSettingsService.Get(SystemSettingsEnum name)");
        }
    }
}
