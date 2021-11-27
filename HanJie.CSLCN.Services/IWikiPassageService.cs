using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IWikiPassageService
    {
        WikiPassage Add(WikiPassage data, int currentUserId);
        void AddViewsCount(int passageId, IPAddress ip);
        List<WikiPassageAnchorTitleDto> CollectAnchorTitles(string content);
        List<BreadCrumbDto> CollectBreadCrumbs(WikiPassageDto wikiPassageDto);
        WikiPassage Create(WikiPassageDto wikiPassageDto);
        WikiPassage GetByRoutePath(string routePath);
        int GetEditingUserId(int passageId);
        bool IsCurrentUserEditing(int passageId, int currentUserId);
        bool IsPassageLocked(int passageId);
        bool IsRoutePathExist(string routePath);
        List<WikiListItemDto> ListAllPassageGenerals(bool readFromDatabaseImmediately = false);
        List<WikiPassageDto> ListAsCooperatePassageDtoes(int userId);
        List<WikiPassage> ListAsCooperatePassages(int userId);
        List<WikiPassageDto> ListAsMainAuthorPassageDtoes(int userId);
        List<WikiPassage> ListAsMainAuthorPassages(int userId);
        List<WikiPassageCommentDto> ListAuditOKComments(int wikiPassageId);
        List<WikiListItemDto> ListCategories(int categoryId);
        bool LockPassageEditingStatus(int passageId, int applyToLockPassageUserId);
        void LockViewsDictionary(Action<Dictionary<int, Dictionary<string, ViewsCountDto>>> action);
        string PickCoverUrlFromContentFirstImage(string content);
        string PickDescriptionFromContent(string content);
        void UnlockPassageEditingStatus(int passageId);
        void Update(WikiPassageDto wikiPassageDto, int currentUserId);
        List<WikiPassageDto> ListDtos();
    }
}