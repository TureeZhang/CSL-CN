using System;
using System.Collections.Generic;
using System.Linq;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class EditorDevoteListController : Controller
    {
        private readonly IUserInfoService _userInfoService;
        private readonly IWikiPassageService _wikiPassageService;
        public static Tuple<DateTime, List<EditorDevoteInfoDto>> EditorDevoteInfoCaches { get; private set; }
        public static Tuple<DateTime, List<EditorDevoteInfoDto>> EditorDevoteInfoMonthlyCaches { get; private set; }

        public EditorDevoteListController(IUserInfoService userInfoService,
            IWikiPassageService wikiPassageService)
        {
            _userInfoService = userInfoService;
            _wikiPassageService = wikiPassageService;
        }

        [HttpGet]
        public IActionResult List(string monthlyTag)
        {
            if (string.IsNullOrEmpty(monthlyTag))
            {
                if (EditorDevoteListController.EditorDevoteInfoCaches != null && EditorDevoteListController.EditorDevoteInfoCaches.Item1 > DateTime.Now.AddMinutes(-5))
                {
                    return Json(EditorDevoteListController.EditorDevoteInfoCaches.Item2);
                }
            }
            else
            {
                if (EditorDevoteListController.EditorDevoteInfoMonthlyCaches != null && EditorDevoteListController.EditorDevoteInfoMonthlyCaches.Item1 > DateTime.Now.AddMinutes(-5))
                {
                    return Json(EditorDevoteListController.EditorDevoteInfoMonthlyCaches.Item2);
                }
            }

            List<EditorDevoteInfoDto> results = new List<EditorDevoteInfoDto>();

            List<UserInfoDto> editors = this._userInfoService.ListEditorsDto(string.IsNullOrEmpty(monthlyTag) ? -1 : 30);
            foreach (UserInfoDto item in editors)
            {
                EditorDevoteInfoDto editorDevoteInfo = new EditorDevoteInfoDto();
                editorDevoteInfo.UserInfo = item;
                editorDevoteInfo.MainAuthPassages = this._wikiPassageService.ListAsMainAuthorPassageDtoes(item.Id);
                editorDevoteInfo.CooAuthPassages = this._wikiPassageService.ListAsCooperatePassageDtoes(item.Id);
                results.Add(editorDevoteInfo);
            }

            if (string.IsNullOrEmpty(monthlyTag))
                EditorDevoteListController.EditorDevoteInfoCaches = new Tuple<DateTime, List<EditorDevoteInfoDto>>(DateTime.Now, results);
            else
                EditorDevoteListController.EditorDevoteInfoMonthlyCaches = new Tuple<DateTime, List<EditorDevoteInfoDto>>(DateTime.Now, results);


            return Json(results);
        }
    }

}
