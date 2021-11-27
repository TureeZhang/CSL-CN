using System.Collections.Generic;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Dtos.SystemSettingsDto;
using HanJie.CSLCN.Models.Enums;

namespace HanJie.CSLCN.Services
{
    public interface ISystemSettingService
    {
        SystemSetting Get(SystemSettingTypeEnum type, string name);
        HomePageSettingsDto GetHomePageSettings();
        SystemSettingDto ListAsDto();
        List<SystemSetting> List();
        List<SystemSetting> ListDataModel();
        void Update(SystemSettingDto settings);
        void UpdateHomePageSettings(HomePageSettingsDto dto);
    }
}