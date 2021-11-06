using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;

namespace HanJie.CSLCN.Services
{
    public interface IWikiPassageViewersCountsService
    {
        WikiPassageViewersCounts GetByWikiPassageId(int wikiPassageId);
        Task UpdateViewersCounts(int id, int newViewersCount);
        Task UpdateAsync(WikiPassageViewersCounts viewersCounts);
    }
}