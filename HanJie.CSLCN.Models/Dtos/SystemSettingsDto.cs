using HanJie.CSLCN.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class SystemSettingsDto : BaseDtoModel<SystemSettingsDto, SystemSettings>
    {
        public string HomepageNews { get; set; }

        public override SystemSettingsDto ConvertFromDataModel(SystemSettings dataModel)
        {
            throw new NotImplementedException("系统设置项结构特殊，此方法无法调用。获取设置选项请直接调用 SystemSettingsService.Get(SystemSettingsEnum name)");
        }
    }
}
