using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HanJie.CSLCN.Models.DataModels
{
    public class Log : BaseDataModel<Log, LogDto>
    {
        [Required]
        public LogLevelEnum LogLevel { get; set; }

        [Required]
        public string Message { get; set; }

        public string ParametersJson { get; set; }
    }
}

