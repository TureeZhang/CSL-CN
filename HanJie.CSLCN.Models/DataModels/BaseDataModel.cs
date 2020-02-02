using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class BaseDataModel<TDataModelType, TDtoType>
        where TDataModelType : class, new()
        where TDtoType : class, new() //标记继承于此方法的必须是一个类，并且具备无参的构造函数
    {
        /// <summary>
        /// 主键ID。
        /// 
        /// 备注：
        ///     创建时，此字段在数据表中自增，无需手动赋值。
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 创建时间。
        /// </summary>
        [DataType(DataType.DateTime)]
        [Required]
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// 最后修改时间。
        /// </summary>
        [DataType(DataType.DateTime)]
        [Required]
        public DateTime LastModifyDate { get; set; }

        /// <summary>
        /// 将传输模型转换为数据模型。
        /// </summary>
        public TDataModelType ConvertFromDtoModel(TDtoType dtoModel)
        {
            TDataModelType result = new TDataModelType();
            foreach (PropertyInfo item in dtoModel.GetType().GetProperties())
            {
                string propName = item.Name;

                if (result.GetType().GetProperties().Where(p => p.Name == propName).FirstOrDefault() != null)
                {
                    if (new List<string>() { "CreateDate", "LastModifyDate" }.Contains(propName))
                    {
                        result.GetType().GetProperty(propName).SetValue(result, Convert.ToDateTime(item.GetValue(dtoModel)));
                    }
                    else if (dtoModel.GetType().GetProperty(propName).PropertyType.FullName.Contains("List`1[System.String]") && result.GetType().GetProperty(propName).PropertyType.FullName == typeof(String).FullName)
                    {
                        result.GetType().GetProperty(propName).SetValue(result, string.Join(",", item.GetValue(dtoModel)));
                    }
                    else
                    {
                        try
                        {
                            result.GetType().GetProperty(propName).SetValue(result, item.GetValue(dtoModel));
                        }
                        catch (Exception)
                        {
                            //do nothing here.
                            //并非所有类型都可以正确转换，如果尝试失败则跳过
                            continue;
                        }
                    }
                }
            }

            return result;
        }
    }
}
