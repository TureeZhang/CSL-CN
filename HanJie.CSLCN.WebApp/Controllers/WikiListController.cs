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
        public static Tuple<DateTime, List<WikiListItemDto>> WikiListCaches;

        private WikiPassageService _wikiPassageService { get; set; }

        public WikiListController(WikiPassageService wikiPassageService,
            UserStatuService userStatuService) : base(userStatuService)
        {
            _wikiPassageService = wikiPassageService;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            if (WikiListCaches!=null && WikiListCaches.Item1.AddMinutes(5) > DateTime.Now)
                return Json(WikiListCaches.Item2);

            List<WikiPassageDto> wikiPassageDtos = this._wikiPassageService.ListDtos();
            List<WikiListItemDto> wikiListItems = new List<WikiListItemDto>();
            foreach (WikiPassageDto item in wikiPassageDtos)
            {
                WikiListItemDto dto = new WikiListItemDto();
                dto.Id = item.Id;
                dto.Title = item.Title;
                dto.Description = item.Content.Substring(0, item.Content.Length<32 ? item.Content.Length : 32);
                dto.RoutePath = item.RoutePath;
                dto.CoverUrl = await this._wikiPassageService.PickCoverUrlFromContentFirstImage(item.Content);
                wikiListItems.Add(dto);
            }

            //Cache
            WikiListController.WikiListCaches = new Tuple<DateTime, List<WikiListItemDto>>(DateTime.Now, wikiListItems);

            return Json(wikiListItems);
        }
    }
}