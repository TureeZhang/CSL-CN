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
        public SystemSettings GetByName(SystemSettingsEnum settingName)
        {
            SystemSettings result = base.CSLDbContext.SystemSettings.Where(item => string.Equals(item.Name, settingName.ToString(), StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
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

        public SystemSettingsDto ListAsDto()
        {
            SystemSettingsDto result = new SystemSettingsDto();

            List<SystemSettings> systemSettings = List();
            foreach (string propName in typeof(SystemSettingsEnum).GetEnumNames())
            {
                string propValue = systemSettings.Where(item => string.Equals(propName, item.Name, StringComparison.OrdinalIgnoreCase)).FirstOrDefault().Value;
                typeof(SystemSettingsDto).GetProperty(propName).SetValue(result, propValue);
            }

            return result;
        }

        public async Task UpdateAsync(SystemSettingsDto settings)
        {
            Ensure.NotNull(settings, nameof(settings));
            Ensure.NotNull(settings.HomepageNews, nameof(settings.HomepageNews));

            foreach (string propName in typeof(SystemSettingsEnum).GetEnumNames())
            {
                SystemSettings setting = this.GetByName(SystemSettingsEnum.HomepageNews);

                if (setting == null)
                    throw new ArgumentException($"不存在设置项名称为 {propName} 的选项。");

                setting.Value = typeof(SystemSettingsDto).GetProperty(propName).GetValue(settings).ToString();
                await base.UpdateAsync(setting);
            }
        }

        public override Task UpdateAsync(SystemSettings data,bool isUpdateLastModifyDate = true)
        {
            //todo: 考虑帮助转换数据模型到传输模型，继续调用(SystemSettingsDto settings)完成更新
            throw new NotImplementedException("请调用 (SystemSettingsDto settings) 完成系统选项更新。");
        }
    }
}
