using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;

namespace HanJie.CSLCN.Services
{
    public interface IWikiPassageViewersCountsService
    {
        WikiPassageViewersCounts GetByWikiPassageId(int wikiPassageId);
        void UpdateViewersCounts(int id, int newViewersCount);
        void Update(WikiPassageViewersCounts viewersCounts);
    }
}