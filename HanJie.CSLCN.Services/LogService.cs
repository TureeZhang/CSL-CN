using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Services
{
    public class LogService : BaseService<LogDto, Log>
    {
        public new async virtual void Log(string message, LogLevelEnum logLevel = LogLevelEnum.Info, object parameters = null)
        {
            Ensure.NotNull(message, nameof(message));

            Log log = new Log();
            log.Message = message;
            log.LogLevel = logLevel;

            if (parameters != null)
                log.ParametersJson = JsonConvert.SerializeObject(parameters);

            await base.AddAsync(log);
        }


    }
}
