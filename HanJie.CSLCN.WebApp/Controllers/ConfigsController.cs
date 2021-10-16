using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigsController : ControllerBase
    {

        private readonly IClientAppService _clientAppService;

        public ConfigsController(IClientAppService clientAppService)
        {
            _clientAppService = clientAppService;
        }

        [HttpGet]
        public ConfigsDto Get()
        {
            ConfigsDto result = ClientAppService.ConfigsDto;

            return result;
        }
    }
}