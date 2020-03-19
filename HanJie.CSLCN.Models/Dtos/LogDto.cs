using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Models.Dtos
{
    public class LogDto : BaseDtoModel<LogDto, Log>
    {
        public LogLevelEnum LogLevel { get; set; }
        public string Message { get; set; }
        public string ParametersJson { get; set; }
    }
}