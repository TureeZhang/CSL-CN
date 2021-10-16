using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class LogService : BaseService<LogDto, Log>, ILogService
    {
        public LogService(CSLDbContext cslDbContext, ICommonHelper commonHelper)
            : base(cslDbContext, commonHelper)
        {

        }

        public async new virtual Task Log(string message, LogLevelEnum logLevel = LogLevelEnum.Info, object parameters = null)
        {
            Ensure.NotNull(message, nameof(message));

            Log log = new Log();
            log.Message = message;
            log.LogLevel = logLevel;

            if (parameters != null)
                log.ParametersJson = JsonConvert.SerializeObject(parameters);

            await base.AddAsync(log);
        }

        /// <summary>
        /// 添加数据
        /// </summary>
        /// <param name="data"></param>
        public virtual new async Task<Log> AddAsync(Log data)
        {
            Ensure.NotNull(data, nameof(data));

            data.CreateDate = DateTime.Now;
            data.LastModifyDate = DateTime.Now;
            Log result = (await CSLDbContext.Set<Log>().AddAsync(data)).Entity;
            await CSLDbContext.SaveChangesAsync();

            return result;

        }


    }
}
