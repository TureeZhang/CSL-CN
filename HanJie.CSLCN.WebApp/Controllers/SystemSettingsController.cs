using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    public class SystemSettingsController : BaseController
    {
        private readonly SystemSettingsService _systemSettingsService;

        public SystemSettingsController(SystemSettingsService systemSettingsService
            , UserStatuService userStatuService) : base(userStatuService)
        {
            this._systemSettingsService = systemSettingsService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            //todo:从系统设置项中独立出首页设置选项。因为系统设置项不应当被未经授权的用户完全获取，而只应当获取用于普通用户的必需配置项。
            SystemSettingsDto dto = this._systemSettingsService.ListAsDto();
            return Json(dto);
        }
    }
}