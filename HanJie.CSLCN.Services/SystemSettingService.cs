using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Dtos.SystemSettingsDto;
using HanJie.CSLCN.Models.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace HanJie.CSLCN.Services
{
    public class SystemSettingService : BaseService<SystemSettingDto, SystemSetting>, ISystemSettingService
    {
        private static object _settingGetLock = new object();

        public SystemSettingService(CSLDbContext cslDbcontext, ICommonHelper commonHelper)
            : base(cslDbcontext, commonHelper)
        {

        }

        public SystemSetting Get(SystemSettingTypeEnum type, string name)
        {
            SystemSetting result = CSLDbContext.SystemSettings.Where(item =>
            item.Type == type && string.Equals(name, item.Name, StringComparison.OrdinalIgnoreCase))?.FirstOrDefault();
            return result;
        }

        public List<SystemSetting> ListDataModel()
        {
            List<SystemSetting> result = CSLDbContext.SystemSettings.ToList();
            return result;
        }

        public override List<SystemSetting> List()
        {
            SystemSettingDto result = new SystemSettingDto();

            List<SystemSetting> settings = ListDataModel();
            foreach (PropertyInfo prop in typeof(SystemSettingTypeEnum).GetProperties())
            {
                string propName = prop.Name;
                string propValue = settings.Where(item => string.Equals(item.Name, propName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault()?.Value;
                prop.SetValue(result, propValue);
            }

            return settings;
        }

        public SystemSettingDto ListAsDto()
        {
            SystemSettingDto result = new SystemSettingDto();

            List<SystemSetting> systemSettings = List();
            foreach (string propName in typeof(SystemSettingTypeEnum).GetEnumNames())
            {
                string propValue = systemSettings.Where(item => string.Equals(propName, item.Name, StringComparison.OrdinalIgnoreCase)).FirstOrDefault().Value;
                typeof(SystemSettingDto).GetProperty(propName).SetValue(result, propValue);
            }

            return result;
        }

        public void Update(SystemSettingDto settings)
        {
            Ensure.NotNull(settings, nameof(settings));
            Ensure.NotNull(settings.Name, nameof(settings.Name));

            foreach (string propName in typeof(SystemSettingTypeEnum).GetEnumNames())
            {
                SystemSetting setting = this.Get(settings.Type, settings.Name);

                if (setting == null)
                    throw new ArgumentException($"不存在类型 {setting.Type.ToString()} 下设置项名称为 {propName} 的选项。");

                setting.Value = typeof(SystemSettingDto).GetProperty(propName).GetValue(settings).ToString();
                base.Update(setting);
            }
        }

        public HomePageSettingsDto GetHomePageSettings()
        {
            lock (_settingGetLock)
            {
                List<SystemSetting> settings = ListSettings(SystemSettingTypeEnum.HomePageSettings);
                HomePageSettingsDto homePageSettings = LoadSettingItems<HomePageSettingsDto>(settings);

                return homePageSettings;
            }
        }

        public virtual void UpdateHomePageSettings(HomePageSettingsDto dto)
        {
            foreach (PropertyInfo prop in typeof(HomePageSettingsDto).GetProperties())
            {
                SystemSetting setting = Get(SystemSettingTypeEnum.HomePageSettings, prop.Name);
                setting.Value = prop.GetValue(dto).ToString();
                Update(setting);
            }
        }

        private T LoadSettingItems<T>(List<SystemSetting> settings) where T : class, new()
        {
            T result = new T();
            foreach (SystemSetting item in settings)
            {
                PropertyInfo propertyInfo = typeof(HomePageSettingsDto).GetProperty(item.Name, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (propertyInfo != null)
                {
                    object value = settings.Find(setting => string.Equals(setting.Name, propertyInfo.Name, StringComparison.OrdinalIgnoreCase)).Value;
                    if (string.Equals(typeof(bool).Name, propertyInfo.PropertyType.Name, StringComparison.OrdinalIgnoreCase))
                    {
                        propertyInfo.SetValue(result, Convert.ToBoolean(value));
                    }
                    else
                    {
                        propertyInfo.SetValue(result, value.ToString());
                    }
                }
            }

            return result;
        }

        private List<SystemSetting> ListSettings(SystemSettingTypeEnum settingType)
        {
            List<SystemSetting> settings = CSLDbContext.SystemSettings.Where(item => item.Type == settingType).AsQueryable().ToList();
            return settings;
        }
    }
}
