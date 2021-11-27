using System;
using System.Collections.Generic;
using System.Linq;
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
        private IDonatorRankService _donatorRankService { get; set; }
        private IUserInfoService _userInfoService { get; set; }

        public DonatorRankController(IDonatorRankService donatorRankService,
            IUserInfoService userInfoService)
        {
            _donatorRankService = donatorRankService;
            _userInfoService = userInfoService;
        }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult GetAsync()
        {
            List<DonatorRankDto> donatorAllRanks = this._donatorRankService.GetDonatorAllRanksOrderbyTotalCount();
            donatorAllRanks = this._userInfoService.BindDonatorUserInfo(donatorAllRanks.ToArray()).ToList();

            return new JsonResult(donatorAllRanks);
        }

        [HttpGet]
        [Route("/api/donatorrank-monthly")]
        public ActionResult GetMonthly()
        {
            List<DonatorRankDto> donatorMonthlyRanks = this._donatorRankService.GetDonatorMontlyRanksOrderbyTotalCount();
            donatorMonthlyRanks = this._userInfoService.BindDonatorUserInfo(donatorMonthlyRanks.ToArray()).ToList();

            return Json(donatorMonthlyRanks);
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody] string value)
        {
            throw new NotImplementedException();
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
