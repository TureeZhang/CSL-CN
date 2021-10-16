using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Dtos.SystemSettingsDto;
using HanJie.CSLCN.Models.Enums;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    public class SystemSettingsController : BaseController
    {
        private readonly ISystemSettingService _systemSettingsService;

        public SystemSettingsController(ISystemSettingService systemSettingsService
            , IUserStatuService userStatuService) : base(userStatuService)
        {
            this._systemSettingsService = systemSettingsService;
        }

        [HttpGet]
        public IActionResult Get(SystemSettingTypeEnum settingType)
        {
            //todo:从系统设置项中独立出首页设置选项。因为系统设置项不应当被未经授权的用户完全获取，而只应当获取用于普通用户的必需配置项。
            switch (settingType)
            {
                case SystemSettingTypeEnum.HomePageSettings:
                    return Json(this._systemSettingsService.GetHomePageSettings());
                default:
                    throw new NotImplementedException();
            }
        }

    }
}