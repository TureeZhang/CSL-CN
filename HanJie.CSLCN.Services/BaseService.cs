using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using Microsoft.EntityFrameworkCore;
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

        public readonly CSLDbContext CSLDbContext;
        public readonly ICommonHelper CommonHelper;
        private readonly ILogService _logService;

        public BaseService(CSLDbContext cslDbContext,ICommonHelper commonHelper)
        {
            this.CSLDbContext = cslDbContext;
            this.CommonHelper = commonHelper;
        }

        /// <summary>
        /// 添加数据
        /// </summary>
        /// <param name="dto"></param>
        protected virtual async Task<TDataModelType> AddAsync(TDataModelType data)
        {
            Ensure.NotNull(data, nameof(data));

            data.CreateDate = DateTime.Now;
            data.LastModifyDate = DateTime.Now;
            TDataModelType result = (await CSLDbContext.Set<TDataModelType>().AddAsync(data)).Entity;
            await CSLDbContext.SaveChangesAsync();

            return result;

        }

        /// <summary>
        /// 根据 ID 删除实数据
        /// </summary>
        /// <param name="id"></param>
        public async Task DeleteByIdAsync(int id)
        {
            TDataModelType data = await CSLDbContext.Set<TDataModelType>().FindAsync(id);
            if (data == null)
                throw new ArgumentException($"指定删除的数据(id:{id})不存在");

            CSLDbContext.Set<TDataModelType>().Remove(data);
            await CSLDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// 编辑数据
        /// </summary>
        /// <param name="dto"></param>
        public virtual async Task UpdateAsync(TDataModelType data)
        {
            Ensure.NotNull(data, nameof(data));

            data.LastModifyDate = DateTime.Now;
            TDataModelType entity = await CSLDbContext.Set<TDataModelType>().FindAsync(data.Id);
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
        public async Task<TDataModelType> GetById(int id)
        {
            TDataModelType data = await CSLDbContext.Set<TDataModelType>().FindAsync(id);
            return data;
        }

        public async virtual Task<List<TDataModelType>> ListAsync()
        {
            List<TDataModelType> results = await CSLDbContext.Set<TDataModelType>().ToListAsync();
            return results;
        }

        public virtual List<TDataModelType> ListWhereAsync(Func<TDataModelType, bool> predicate)
        {
            List<TDataModelType> results = CSLDbContext.Set<TDataModelType>().Where(predicate).ToList();
            return results;
        }

        public async virtual Task<List<TDtoType>> ListDtos()
        {
            List<TDataModelType> datas = await CSLDbContext.Set<TDataModelType>().ToListAsync();
            List<TDtoType> dtos = new List<TDtoType>();
            foreach (TDataModelType item in datas)
            {
                dtos.Add(new TDtoType().ConvertFromDataModel(item));
            }

            return dtos;
        }

        public async virtual Task Log(string message, LogLevelEnum logLevel = LogLevelEnum.Info, object parameters = null)
        {
            await this._logService.Log(message, logLevel, parameters);
        }
    }
}