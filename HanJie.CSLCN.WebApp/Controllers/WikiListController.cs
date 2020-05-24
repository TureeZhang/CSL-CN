using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WikiListController : BaseController
    {

        private WikiPassageService _wikiPassageService { get; set; }

        public WikiListController(WikiPassageService wikiPassageService,
            UserStatuService userStatuService) : base(userStatuService)
        {
            _wikiPassageService = wikiPassageService;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            List<WikiListItemDto> wikiListItemDtos = await this._wikiPassageService.ListAllPassageGenerals();
            return Json(wikiListItemDtos);
        }

    }
}