using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;

namespace HanJie.CSLCN.Services
{
    public class DonatorRankService : BaseService<DonatorRankDto, DonatorRank>
    {
        public async Task<List<DonatorRankDto>> GetDonatorAllRanksOrderbyTotalCountAsync()
        {
            List<DonatorRank> donatorRanks = await CSLDbContext.DonatorRanks.ToListAsync();
            List<DonatorRankDto> results = CountTotalWithOrderbyDesc(donatorRanks);

            return results;
        }

        public virtual async Task<List<DonatorRankDto>> GetDonatorMontlyRanksOrderbyTotalCountAsync()
        {
            DateTime minData = DateTime.Now.AddDays(-30);
            List<DonatorRank> donatorRanks = await CSLDbContext.DonatorRanks.Where(item => item.CreateDate >= minData).ToListAsync();
            List<DonatorRankDto> results = CountTotalWithOrderbyDesc(donatorRanks);

            return results;
        }

        public List<DonatorRankDto> CountTotalWithOrderbyDesc(List<DonatorRank> donatorRanks)
        {
            List<Tuple<int, decimal>> userIdMoneyList = new List<Tuple<int, decimal>>();
            foreach (DonatorRank item in donatorRanks)
            {
                Tuple<int, decimal> userIdMoney = new Tuple<int, decimal>(item.UserId, item.DonateTotalCount);
                userIdMoneyList.Add(userIdMoney);
            }

            Dictionary<int, decimal> userIdMoneySummaryDictionary = new Dictionary<int, decimal>();
            foreach (Tuple<int, decimal> item in userIdMoneyList)
            {
                int userId = item.Item1;
                decimal moneyCount = item.Item2;

                if (!userIdMoneySummaryDictionary.ContainsKey(userId))
                {
                    userIdMoneySummaryDictionary.Add(userId, moneyCount);
                }
                else
                {
                    userIdMoneySummaryDictionary[userId] += moneyCount;
                }
            }

            List<DonatorRankDto> results = new List<DonatorRankDto>();
            foreach (KeyValuePair<int, decimal> item in userIdMoneySummaryDictionary)
            {
                DonatorRankDto dto = new DonatorRankDto();
                dto.UserId = item.Key;
                dto.DonateTotalCount = item.Value;
                results.Add(dto);
            }

            results.Sort((x, y) =>
            {
                if (x.DonateTotalCount == y.DonateTotalCount)
                {
                    return 0;
                }
                else if (x.DonateTotalCount > y.DonateTotalCount)
                {
                    return -1;
                }
                else
                {
                    return 1;
                }
            });

            return results;
        }

        public virtual Task<DonatorRank> CreateAsync(DonatorRankDto data)
        {
            Ensure.NotNull(data, nameof(data));
            Ensure.NotNull(data.UserId, nameof(data.UserId));
            Ensure.MoreThan(data.DonateTotalCount, 0, nameof(data.DonateTotalCount));
            Ensure.NotNull(data.PaymentCompany, nameof(data.PaymentCompany));
            Ensure.NotNull(data.PaymentUserNameSecretly, nameof(data.PaymentUserNameSecretly));
            Ensure.NotNull(data.PaymentAccountSecretly, nameof(data.PaymentAccountSecretly));
            Ensure.NotNull(data.OrderId, nameof(data.OrderId));

            data.Id = 0;    //新增数据，ID 自增，需确保为 0 ，由数据库决定 ID
            DonatorRank entity = new DonatorRank().ConvertFromDtoModel(data);
            return base.AddAsync(entity);
        }

    }

}
