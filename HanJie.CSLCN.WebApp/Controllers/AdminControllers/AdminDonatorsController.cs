using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers.AdminControllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AdminDonatorsController : AdminBaseController
    {

        private DonatorRankService _donatorRankService;
        private readonly UserInfoService _userInfoService;

        public AdminDonatorsController(UserStatuService userStatuService,
            DonatorRankService donatorRankService,
            UserInfoService userInfoService) : base(userStatuService)
        {
            this._donatorRankService = donatorRankService;
            this._userInfoService = userInfoService;
        }

        [HttpGet("{id}")]
        public Task<IActionResult> Get(int id)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public async Task<IActionResult> ListAll()
        {
            List<DonatorRankDto> dtos = new List<DonatorRankDto>();
            List<DonatorRank> list =await this._donatorRankService.ListAsync();
            foreach (DonatorRank item in list)
            {
                DonatorRankDto dto = new DonatorRankDto().ConvertFromDataModel(item);
                dtos.Add(dto);
            }
            dtos = (await this._userInfoService.BindDonatorUserInfo(dtos.ToArray())).ToList();

            return Json(dtos);
        }

        [HttpPost]
        public async Task<IActionResult> Post(DonatorRankDto dto)
        {
            Ensure.NotNull(dto, nameof(dto));

            DonatorRank entity = await this._donatorRankService.CreateAsync(dto);
            dto = new DonatorRankDto().ConvertFromDataModel(entity);
            dto = (await this._userInfoService.BindDonatorUserInfo(dto)).FirstOrDefault();

            return Json(dto);
        }
    }
}