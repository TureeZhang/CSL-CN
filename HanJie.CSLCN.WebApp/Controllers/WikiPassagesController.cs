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
        private readonly IWikiPassageCommentService _wikiPassageCommentService;

        public WikiPassagesController(IWikiPassageService wikiPassageService,
            IUserInfoService userInfoService,
            IWikiCategoryService wikiCategoryService,
            IWikiPassageViewersCountsService wikiPassageViewersCountsService,
            IUserStatuService userStatuService,
            IWikiPassageCommentService wikiPassageCommentService) : base(userStatuService)
        {
            this._userInfoService = userInfoService;
            this._wikiPassageService = wikiPassageService;
            this._wikiCategoryService = wikiCategoryService;
            this._wikiPassageViewersCountsService = wikiPassageViewersCountsService;
            this._wikiPassageCommentService = wikiPassageCommentService;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public JsonResult Get(string id)
        {
            WikiPassage wikiPassage = this._wikiPassageService.GetByRoutePath(id);
            WikiPassageDto wikiPassageDto = Mapper.Map<WikiPassageDto>(wikiPassage);
            wikiPassageDto.AnchorTitles = this._wikiPassageService.CollectAnchorTitles(wikiPassageDto.Content);
            wikiPassageDto.MainAuthors = this._userInfoService.CollectAuthorInfoes(wikiPassage.MainAuthors.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries));
            wikiPassageDto.CoAuthors = wikiPassage.CoAuthors != null ? this._userInfoService.CollectAuthorInfoes(wikiPassage.CoAuthors?.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries)) : null;
            wikiPassageDto.BreadCrumbs = wikiPassage.CategoryId != 0 ? this._wikiPassageService.CollectBreadCrumbs(wikiPassageDto) : null;
            wikiPassageDto.TotalViewsCount = this._wikiPassageViewersCountsService.GetByWikiPassageId(wikiPassage.Id).ViewersCount;
            wikiPassageDto.Comments = this._wikiPassageService.ListAuditOKComments(wikiPassage.Id);
            int editingUserId = this._wikiPassageService.GetEditingUserId(wikiPassageDto.Id);
            wikiPassageDto.EditingUser = editingUserId == 0 ? null : new UserInfoDto().ConvertFromDataModel(this._userInfoService.GetById(editingUserId));
            wikiPassageDto.LastModifyDate = wikiPassage.LastModifyDate.ToString("yyyy-MM-dd hh:mm:ss");

            //
            //此处是有意不做等待的，阅读量的统计不应当影响文本内容的返回。

            Task.Run(() =>
            {
                this._wikiPassageService.AddViewsCount(wikiPassageDto.Id, base.HttpContext.Connection.RemoteIpAddress);
            });

            return new JsonResult(wikiPassageDto);
        }

        [HttpGet]
        [Route("/api/wikipassages/isduplicated")]
        public IActionResult IsDuplicated(string routePath)
        {
            Ensure.NotNull(routePath, nameof(routePath));

            bool result = this._wikiPassageService.IsRoutePathExist(routePath);
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
        [AdministratorOnly]
        public IActionResult Post([FromBody] WikiPassageDto dto)
        {
            if (!base.CurrentUser.IsAdmin)
            {
                return new UnauthorizedResult();
            }

            dto.MainAuthors = new List<UserInfoDto> { base.CurrentUser };
            WikiPassage wikiPassage = this._wikiPassageService.Create(dto);
            WikiPassageDto wikiPassageDto = new WikiPassageDto().ConvertFromDataModel(wikiPassage);

            return Json(wikiPassageDto);
        }

        // PUT api/<controller>/5
        [HttpPut]
        [AdministratorOnly]
        public void Put([FromBody] WikiPassageDto dto)
        {
            this._wikiPassageService.Update(dto, base.CurrentUser.Id);
            this._userInfoService.UpdateLastCommitInfo(base.CurrentUser.Id);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost("/api/[controller]/createcomment")]
        public IActionResult CreateComment(WikiPassageCommentDto comment)
        {
            Ensure.NotNull(comment, nameof(comment));

            this._wikiPassageCommentService.Create(comment);
            return Ok();
        }

        [HttpGet("/api/[controller]/deletecomment")]
        public IActionResult DeleteComment(int id)
        {
            Ensure.IsDatabaseId(id, nameof(id));
            this._wikiPassageCommentService.Delete(id, base.CurrentUser.Id);
            return Ok();
        }
    }
}
