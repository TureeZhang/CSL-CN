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
        Task<WikiPassage> AddAsync(WikiPassage data, int currentUserId);
        Task<List<WikiPassageAnchorTitleDto>> CollectAnchorTitlesAsync(string content);
        Task<List<BreadCrumbDto>> CollectBreadCrumbsAsync(WikiPassageDto wikiPassageDto);
        Task<WikiPassage> Create(WikiPassageDto wikiPassageDto);
        Task<WikiPassage> GetByRoutePathAsync(string routePath);
        int GetEditingUserId(int passageId);
        bool IsCurrentUserEditing(int passageId, int currentUserId);
        bool IsPassageLocked(int passageId);
        Task<bool> IsRoutePathExist(string routePath);
        Task<List<WikiListItemDto>> ListAllPassageGenerals(bool readFromDatabaseImmediately = false);
        Task<List<WikiPassageDto>> ListDtos();
        Task<List<WikiPassageDto>> ListAsCooperatePassageDtoes(int userId);
        Task<List<WikiPassage>> ListAsCooperatePassages(int userId);
        Task<List<WikiPassageDto>> ListAsMainAuthorPassageDtoes(int userId);
        Task<List<WikiPassage>> ListAsMainAuthorPassages(int userId);
        Task<List<WikiListItemDto>> ListCategoriesAsync(int categoryId);
        bool LockPassageEditingStatus(int passageId, int applyToLockPassageUserId);
        Task<string> PickCoverUrlFromContentFirstImage(string content);
        Task<string> PickDescriptionFromContent(string content);
        void UnlockPassageEditingStatus(int passageId);
        void LockViewsDictionary(Action<Dictionary<int, Dictionary<string, ViewsCountDto>>> action);
        Task UpdateAsync(WikiPassageDto wikiPassageDto, int currentUserId);
        Task UpdateAsync(WikiPassage wikiPassage);
        Task<WikiPassage> GetById(int id);
        Task AddViewsCount(int passageId, IPAddress ip);
    }
}