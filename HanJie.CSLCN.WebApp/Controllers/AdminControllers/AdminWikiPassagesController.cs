using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers.AdminControllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AdminWikiPassagesController : AdminBaseController
    {
        private readonly IWikiPassageService _wikiPassageService;

        public AdminWikiPassagesController(IUserStatuService userStatuService,
            IWikiPassageService wikiPassageService) : base(userStatuService)
        {
            this._wikiPassageService = wikiPassageService;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            List<WikiPassageDto> datas =await this._wikiPassageService.ListDtos();
            return Json(datas);
        }

        [HttpPost]
        public async Task<IActionResult> Post(WikiPassageDto wikiPassageDto)
        {
            Ensure.NotNull(wikiPassageDto, nameof(wikiPassageDto));

            WikiPassage wikiPassage = await this._wikiPassageService.Create(wikiPassageDto);
            wikiPassageDto = new WikiPassageDto().ConvertFromDataModel(wikiPassage);

            return Json(wikiPassageDto);
        }

    }
}