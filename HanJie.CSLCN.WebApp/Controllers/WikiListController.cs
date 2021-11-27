using System;
using System.Collections.Generic;
using System.Linq;
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

        private IWikiPassageService _wikiPassageService { get; set; }

        public WikiListController(IWikiPassageService wikiPassageService,
            IUserStatuService userStatuService) : base(userStatuService)
        {
            _wikiPassageService = wikiPassageService;
        }

        [HttpGet]
        [Route("/api/wikilist")]
        public IActionResult List(int? categoryId)
        {
            List<WikiListItemDto> wikiListItemDtos = null;
            if (categoryId.HasValue)
            {
                Ensure.IsDatabaseId(categoryId.Value, nameof(categoryId));
                wikiListItemDtos =  this._wikiPassageService.ListCategories(categoryId.Value);
            }
            else
            {
                wikiListItemDtos =  this._wikiPassageService.ListAllPassageGenerals();
            }
            return Json(wikiListItemDtos);
        }

    }
}