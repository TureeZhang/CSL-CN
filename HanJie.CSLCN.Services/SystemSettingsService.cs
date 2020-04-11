using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class SystemSettingsService : BaseService<SystemSettingsDto, SystemSettings>
    {
        public string GetByName(SystemSettingsEnum settingName)
        {
            string result = base.CSLDbContext.SystemSettings.Where(item => string.Equals(item.Name, settingName.ToString(), StringComparison.OrdinalIgnoreCase)).FirstOrDefault()?.Value;
            return result;
        }

        public List<SystemSettings> ListDataModel()
        {
            List<SystemSettings> result = base.CSLDbContext.SystemSettings.ToList();
            return result;
        }

        public override List<SystemSettings> List()
        {
            SystemSettingsDto result = new SystemSettingsDto();

            List<SystemSettings> settings = ListDataModel();
            foreach (PropertyInfo prop in typeof(SystemSettingsEnum).GetProperties())
            {
                string propName = prop.Name;
                string propValue = settings.Where(item => string.Equals(item.Name, propName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault()?.Value;
                prop.SetValue(result, propValue);
            }

            return settings;
        }

        public async Task UpdateAsync(SystemSettingsDto settings)
        {
            Ensure.NotNull(settings, nameof(settings));

            foreach (PropertyInfo prop in typeof(SystemSettingsEnum).GetProperties())
            {
                string propName = prop.Name;
                string propValue = prop.GetValue(settings)?.ToString();

                if (propValue != null)
                {
                    SystemSettings systemSettings = new SystemSettings();
                    systemSettings.Name = propName;
                    systemSettings.Value = propValue;
                    await base.UpdateAsync(systemSettings);
                }
            }
        }

        public override Task UpdateAsync(SystemSettings data)
        {
            //todo: 考虑帮助转换数据模型到传输模型，继续调用(SystemSettingsDto settings)完成更新
            throw new NotImplementedException("请调用 (SystemSettingsDto settings) 完成系统选项更新。");
        }
    }
}
