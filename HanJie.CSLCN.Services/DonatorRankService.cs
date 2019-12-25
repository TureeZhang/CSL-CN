using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class DonatorRankService : BaseService<DonatorRankDto, DonatorRank>
    {
        public async Task<List<DonatorRank>> GetDonatorRanksOrderbyTotalCountAsync()
        {
            List<DonatorRank> results = await CSLDbContext.DonatorRanks.Select(d => d)
                .OrderByDescending(d => d.DonateTotalCount)
                .AsNoTracking()
                .ToListAsync();
            return results;
        }
    }
}
