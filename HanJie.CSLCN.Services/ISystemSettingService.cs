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
        Task<SystemSettingDto> ListAsDto();
        Task<List<SystemSetting>> ListAsync();
        Task<List<SystemSetting>> ListDataModelAsync();
        Task UpdateAsync(SystemSettingDto settings);
        void UpdateHomePageSettings(HomePageSettingsDto dto);
    }
}