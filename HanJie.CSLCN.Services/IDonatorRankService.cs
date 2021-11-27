using System.Collections.Generic;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IDonatorRankService
    {
        List<DonatorRankDto> CountTotalWithOrderbyDesc(List<DonatorRank> donatorRanks);
        DonatorRank Create(DonatorRankDto data);
        List<DonatorRankDto> GetDonatorAllRanksOrderbyTotalCount();
        List<DonatorRankDto> GetDonatorMontlyRanksOrderbyTotalCount();
        List<DonatorRank> List();
    }
}