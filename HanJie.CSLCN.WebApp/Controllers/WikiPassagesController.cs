using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;
using HanJie.CSLCN.WebApp.Attributes;
using HanJie.CSLCN.Common;
using System.Runtime.CompilerServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class WikiPassagesController : BaseController
    {

        private readonly IWikiPassageService _wikiPassageService;
        private readonly IUserInfoService _userInfoService;
        private readonly IWikiCategoryService _wikiCategoryService;
        private readonly IWikiPassageViewersCountsService _wikiPassageViewersCountsService;

        public WikiPassagesController(IWikiPassageService wikiPassageService,
            IUserInfoService userInfoService,
            IWikiCategoryService wikiCategoryService,
            IWikiPassageViewersCountsService wikiPassageViewersCountsService,
            IUserStatuService userStatuService) : base(userStatuService)
        {
            this._userInfoService = userInfoService;
            this._wikiPassageService = wikiPassageService;
            this._wikiCategoryService = wikiCategoryService;
            this._wikiPassageViewersCountsService = wikiPassageViewersCountsService;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> GetAsync(string id)
        {
            WikiPassage wikiPassage = await this._wikiPassageService.GetByRoutePathAsync(id);
            WikiPassageDto wikiPassageDto = new WikiPassageDto().ConvertFromDataModel(wikiPassage);
            wikiPassageDto.AnchorTitles = await this._wikiPassageService.CollectAnchorTitlesAsync(wikiPassageDto.Content);
            wikiPassageDto.MainAuthors = await this._userInfoService.CollectAuthorInfoes(wikiPassage.MainAuthors.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries));
            wikiPassageDto.CoAuthors = wikiPassage.CoAuthors != null ? await this._userInfoService.CollectAuthorInfoes(wikiPassage.CoAuthors?.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries)) : null;
            wikiPassageDto.BreadCrumbs = wikiPassage.CategoryId != 0 ? await this._wikiPassageService.CollectBreadCrumbsAsync(wikiPassageDto) : null;
            wikiPassageDto.TotalViewsCount = this._wikiPassageViewersCountsService.GetByWikiPassageId(wikiPassage.Id).ViewersCount;

            int editingUserId = this._wikiPassageService.GetEditingUserId(wikiPassageDto.Id);
            wikiPassageDto.EditingUser = editingUserId == 0 ? null : new UserInfoDto().ConvertFromDataModel(await this._userInfoService.GetById(editingUserId));

            //
            //此处是有意不做等待的，阅读量的统计不应当影响文本内容的返回。

            TaskAwaiter taskAwaiter = Task.Run(async () =>
             {
                 await this._wikiPassageService.AddViewsCount(wikiPassageDto.Id, base.HttpContext.Connection.RemoteIpAddress);
             }).GetAwaiter();

            return new JsonResult(wikiPassageDto);
        }

        [HttpGet]
        [Route("/api/wikipassages/isduplicated")]
        public async Task<IActionResult> IsDuplicated(string routePath)
        {
            Ensure.NotNull(routePath, nameof(routePath));

            bool result = await this._wikiPassageService.IsRoutePathExist(routePath);
            return Json(result);
        }

        #region 编辑锁定功能
        [HttpGet]
        [Route("/api/wikipassages/lockpassageeditingstatus")]
        public IActionResult LockEditingStatus(int passageId)
        {
            bool lockResult = this._wikiPassageService.LockPassageEditingStatus(passageId, base.CurrentUser.Id);
            return Json(lockResult);
        }

        [HttpGet]
        [Route("/api/wikipassages/imstillonline")]
        public IActionResult ImStillOnline(int passageId)
        {
            this._wikiPassageService.LockPassageEditingStatus(passageId, base.CurrentUser.Id);
            return Json(true);
        }
        #endregion

        // POST api/<controller>
        [HttpPost]
        [MyAuthorize]
        public async Task<IActionResult> PostAsync([FromBody] WikiPassageDto dto)
        {
            if (!base.CurrentUser.IsAdmin)
            {
                return new UnauthorizedResult();
            }

            dto.MainAuthors = new List<UserInfoDto> { base.CurrentUser };
            WikiPassage wikiPassage = await this._wikiPassageService.Create(dto);
            WikiPassageDto wikiPassageDto = new WikiPassageDto().ConvertFromDataModel(wikiPassage);

            return Json(wikiPassageDto);
        }

        // PUT api/<controller>/5
        [HttpPut]
        [MyAuthorize]
        public async Task Put([FromBody] WikiPassageDto dto)
        {
            await this._wikiPassageService.UpdateAsync(dto, base.CurrentUser.Id);
            await this._userInfoService.UpdateLastCommitInfo(base.CurrentUser.Id);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
