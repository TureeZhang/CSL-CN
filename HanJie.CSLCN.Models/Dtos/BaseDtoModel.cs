using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class BaseDtoModel<TDtoType, TDataModelType>
        where TDtoType : class, new() //标记继承于此方法的必须是一个类，并且具备无参的构造函数
        where TDataModelType : class, new()
    {
        public int Id { get; set; }
        public string CreateDate { get; set; }
        public string LastModifyDate { get; set; }

        /// <summary>
        /// 将数据模型转换为传输模型。
        /// </summary>
        public virtual TDtoType ConvertFromDataModel(TDataModelType dataModel)
        {
            TDtoType result = new TDtoType();
            foreach (PropertyInfo item in dataModel.GetType().GetProperties())
            {
                string propName = item.Name;
                string propTypeFullName = item.PropertyType.FullName;
                if (propTypeFullName == typeof(DateTime).FullName || propTypeFullName == typeof(DateTime?).FullName)
                {
                    result.GetType().GetProperty(propName).SetValue(result, item.GetValue(dataModel)?.ToString());
                }
                else if (propTypeFullName == typeof(String).FullName && typeof(TDtoType).GetProperty(propName).PropertyType.FullName.Contains("List`1[System.String]"))
                {
                    string[] array = item.GetValue(dataModel).ToString().Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                    result.GetType().GetProperty(propName).SetValue(result, new List<string>(array));
                }
                else
                {
                    try
                    {
                        PropertyInfo prop = result.GetType().GetProperty(propName);
                        if (prop != null)
                            prop.SetValue(result, item.GetValue(dataModel));
                    }
                    catch (Exception ex)
                    {
                        //do nothing here.
                        //并非所有类型都可以正确转换，如果尝试失败则跳过
                    }
                }
            }

            return result;
        }
    }
}
