using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class DonatorRankController : Controller
    {
        private DonatorRankService _donatorRankService { get; set; }
        private UserInfoService _userInfoService { get; set; }

        public DonatorRankController(DonatorRankService donatorRankService,
            UserInfoService userInfoService)
        {
            _donatorRankService = donatorRankService;
            _userInfoService = userInfoService;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            List<DonatorRank> donatorRanks = await this._donatorRankService.GetDonatorRanksOrderbyTotalCountAsync();
            List<DonatorRankDto> datas = new List<DonatorRankDto>();
            foreach (DonatorRank item in donatorRanks)
            {
                DonatorRankDto dto = new DonatorRankDto().ConvertFromDataModel(item);
                UserInfo user = this._userInfoService.GetById(item.Id);
                dto.UserNickName = user.NickName;
                dto.AvatarUrl = user.AvatarUrl;
                datas.Add(dto);
            }

            return new JsonResult(datas);
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
            throw new NotImplementedException();
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
