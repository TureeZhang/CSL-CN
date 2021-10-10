using System.Collections.Generic;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IDonatorRankService
    {
        List<DonatorRankDto> CountTotalWithOrderbyDesc(List<DonatorRank> donatorRanks);
        Task<DonatorRank> CreateAsync(DonatorRankDto data);
        Task<List<DonatorRankDto>> GetDonatorAllRanksOrderbyTotalCountAsync();
        Task<List<DonatorRankDto>> GetDonatorMontlyRanksOrderbyTotalCountAsync();
    }
}