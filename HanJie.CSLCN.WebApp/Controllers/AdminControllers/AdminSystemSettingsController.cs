using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers.AdminControllers
{
    [Route("api/admin/[controller]")]
    public class AdminSystemSettingsController : AdminBaseController
    {
        private readonly SystemSettingsService _systemSettingsService;


        public AdminSystemSettingsController(SystemSettingsService systemSettingsService,
            UserStatuService userStatuService) : base(userStatuService)
        {
            this._systemSettingsService = systemSettingsService;
        }

        [HttpPost]
        public async Task<IActionResult> Update(SystemSettingsDto dto)
        {
            Ensure.NotNull(dto, nameof(dto));
            Ensure.NotNull(dto.Id, nameof(dto));
            Ensure.NotNull(dto.HomepageNews, nameof(dto));

            await this._systemSettingsService.UpdateAsync(dto);
            return Ok();
        }
    }
}
