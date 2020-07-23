using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Dtos.SystemSettingsDto;
using HanJie.CSLCN.Models.Enums;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers.AdminControllers
{
    [Route("api/admin/[controller]")]
    public class AdminSystemSettingsController : AdminBaseController
    {
        private readonly SystemSettingService _systemSettingsService;


        public AdminSystemSettingsController(SystemSettingService systemSettingsService,
            UserStatuService userStatuService) : base(userStatuService)
        {
            this._systemSettingsService = systemSettingsService;
        }

        [HttpGet]
        public IActionResult Get(SystemSettingTypeEnum settingType)
        {
            switch (settingType)
            {
                case SystemSettingTypeEnum.HomePageSettings:
                    HomePageSettingsDto result = this._systemSettingsService.GetHomePageSettings();
                    return Json(result);
                default:
                    throw new NotFiniteNumberException();
            }

        }

        [HttpPost]
        public IActionResult Update(SystemSettingTypeEnum settingType, object settings)
        {
            Ensure.NotNull(settings, nameof(settings));

            switch (settingType)
            {
                case SystemSettingTypeEnum.HomePageSettings:
                    this._systemSettingsService.UpdateHomePageSettings(Newtonsoft.Json.JsonConvert.DeserializeObject<HomePageSettingsDto>(settings.ToString()));
                    break;
                default:
                    throw new NotImplementedException();
            }

            return Ok();
        }
    }
}
