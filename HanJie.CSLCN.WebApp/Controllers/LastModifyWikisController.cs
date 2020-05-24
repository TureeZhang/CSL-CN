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
    public class LastModifyWikisController : BaseController
    {
        public static Tuple<DateTime, List<WikiListItemDto>> LastModifyWikisCaches { get; private set; }


        private readonly WikiPassageService _wikiPassageService;
        private readonly UserInfoService _userInfoService;

        public LastModifyWikisController(WikiPassageService wikiPassageService,
            UserInfoService userInfoService,
            UserStatuService userStatuService) : base(userStatuService)
        {
            this._wikiPassageService = wikiPassageService;
            this._userInfoService = userInfoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            if (LastModifyWikisController.LastModifyWikisCaches != null && DateTime.Now.AddMinutes(-5) <= LastModifyWikisController.LastModifyWikisCaches.Item1)
            {
                return Json(LastModifyWikisController.LastModifyWikisCaches.Item2);
            }

            List<WikiListItemDto> wikiListItemDtos = await this._wikiPassageService.ListAllPassageGenerals();
            wikiListItemDtos = wikiListItemDtos.OrderByDescending(item => item.LastModifyDate).ToList();
            foreach (var item in wikiListItemDtos)
            {
                UserInfoDto userInfoDto = new UserInfoDto().ConvertFromDataModel(this._userInfoService.GetById(item.LastModifyUser.Id));
                item.LastModifyUser = userInfoDto;
            }

            LastModifyWikisController.LastModifyWikisCaches = new Tuple<DateTime, List<WikiListItemDto>>(DateTime.Now, wikiListItemDtos);

            return Json(wikiListItemDtos);
        }

        [HttpPatch]
        public void Update()
        {
            throw new NotImplementedException();
        }


    }
}
