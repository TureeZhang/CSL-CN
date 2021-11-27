using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HanJie.CSLCN.WebApp.Controllers
{
    public class LastModifyWikisController : BaseController
    {
        public static Tuple<DateTime, List<WikiListItemDto>> LastModifyWikisCaches { get; private set; }


        private readonly IWikiPassageService _wikiPassageService;
        private readonly IUserInfoService _userInfoService;

        public LastModifyWikisController(IWikiPassageService wikiPassageService,
            IUserInfoService userInfoService,
            IUserStatuService userStatuService) : base(userStatuService)
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
            List<WikiListItemDto> wikiListItemDtos = this._wikiPassageService.ListAllPassageGenerals();

            //todo:严重的性能问题。前期偷懒，取出了全部了文档对象再 take(25)，应当从 List 起就决定从数据库读取的数据条数。
            wikiListItemDtos = wikiListItemDtos.OrderByDescending(item => item.LastModifyDate).Take(20).ToList();
            foreach (var item in wikiListItemDtos)
            {
                UserInfoDto userInfoDto = new UserInfoDto().ConvertFromDataModel( this._userInfoService.GetById(item.LastModifyUser.Id) ??
                    throw new ArgumentException($"user not exist. id={item.LastModifyUser.Id}"));
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
