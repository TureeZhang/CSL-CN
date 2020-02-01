using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class BaseService<TDtoType, TDataModelType>
        where TDtoType : BaseDtoModel<TDtoType, TDataModelType>, new()
        where TDataModelType : BaseDataModel<TDataModelType, TDtoType>, new()     //约束继承此基类的子类必须拥有传输模型和数据模型，且数据模型和传输模型必须继承自 BaseDtoModel 和 BaseDataModel
    {
        public CSLDbContext CSLDbContext { get; set; }
        public CommonHelper CommonHelper { get; set; }

        public BaseService()
        {
            this.CommonHelper = new CommonHelper();
            this.CSLDbContext = new CSLDbContext();
        }

        public T GetService<T>()
        {
            return GlobalService.ServiceProvider.GetService<T>();
        }

        /// <summary>
        /// 添加数据
        /// </summary>
        /// <param name="dto"></param>
        public async Task AddAsync(TDataModelType data)
        {
            if (data == null)
            {
                throw new ArgumentNullException(nameof(data));
            }

            data.CreateDate = DateTime.Now;
            data.LastModifyDate = DateTime.Now;
            await CSLDbContext.Set<TDataModelType>().AddAsync(data);
            await CSLDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// 根据 ID 删除实数据
        /// </summary>
        /// <param name="id"></param>
        public async Task DeleteByIdAsync(int id)
        {
            TDataModelType data = CSLDbContext.Set<TDataModelType>().Find(id);
            if (data == null)
                throw new ArgumentException($"指定删除的数据(id:{id})不存在");

            CSLDbContext.Set<TDataModelType>().Remove(data);
            await CSLDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// 编辑数据
        /// </summary>
        /// <param name="dto"></param>
        public async Task UpdateAsync(TDataModelType data)
        {
            if (data == null)
            {
                throw new ArgumentNullException(nameof(data));
            }

            data.LastModifyDate = DateTime.Now;

            TDataModelType entity = CSLDbContext.Set<TDataModelType>().Where(e => e.Id == data.Id).FirstOrDefault();
            Type modelType = typeof(TDataModelType);
            foreach (string propName in typeof(TDataModelType).GetProperties().Select(p => p.Name).ToList())
            {
                modelType.GetProperty(propName).SetValue(entity, modelType.GetProperty(propName).GetValue(data));
            }
            CSLDbContext.Set<TDataModelType>().Update(entity);
            await CSLDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// 根据 ID 查询数据。
        /// </summary>
        /// <param name="id"></param>
        /// <returns>查找到的数据，或是 null</returns>
        public TDataModelType GetById(int id)
        {
            TDataModelType data = CSLDbContext.Set<TDataModelType>().Find(id);

            return data;
        }

        public virtual List<TDataModelType> List()
        {
            List<TDataModelType> results = this.CSLDbContext.Set<TDataModelType>().ToList();
            return results;
        }
    }
}