using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HanJie.CSLCN.WebApp.Controllers
{
    public class WikiCategoryController : BaseController
    {
        private IWikiCategoryService _wikiCategoryService;

        public WikiCategoryController(IUserStatuService userStatuService,
            IWikiCategoryService wikiCategoryService,
            IRedisService redisService)
            : base(userStatuService)
        {
            this._wikiCategoryService = wikiCategoryService;
        }

        [HttpGet]
        [Route("/api/wikicategory")]
        public IActionResult Get()
        {
            RedisService redisService = new RedisService();



            List<WikiCategoryDto> results = redisService.ObjectGet<List<WikiCategoryDto>>(StringConsts.WikiCategoryCacheKey);
            if (results == null)
            {
                results = this._wikiCategoryService.ListDtos();
                redisService.ObjectSet(StringConsts.WikiCategoryCacheKey, results);
            }

            return Json(results);
        }


    }
}
