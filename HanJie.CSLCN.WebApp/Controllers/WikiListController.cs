using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
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
        [Route("/api/wikilist")]
        public async Task<IActionResult> List(int? categoryId)
        {
            List<WikiListItemDto> wikiListItemDtos = null;
            if (categoryId.HasValue)
            {
                Ensure.IsDatabaseId(categoryId.Value, nameof(categoryId));
                wikiListItemDtos = await this._wikiPassageService.ListCategoriesAsync(categoryId.Value);
            }
            else
            {
                wikiListItemDtos = await this._wikiPassageService.ListAllPassageGenerals();
            }
            return Json(wikiListItemDtos);
        }

    }
}