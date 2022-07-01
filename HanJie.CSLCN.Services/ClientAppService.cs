using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Services
{
    public class ClientAppService : IClientAppService
    {

        public static ConfigsDto ConfigsDto { get; private set; }

        public ClientAppService()
        {
            Init();
        }

        public void Init()
        {
            ConfigsDto result = new ConfigsDto();
            result.QiniuCdnHostUri = GlobalConfigs.AppSettings.QiniuConfig.CdnHostUri;

            ClientAppService.ConfigsDto = result;
        }

    }
}
