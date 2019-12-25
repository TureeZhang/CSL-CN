using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HanJie.CSLCN.WebApp.Controllers
{
    [Route("api/[controller]")]
    public class MenusController : BaseController
    {

        #region 数据服务
        private MenuService _menuService { get; set; }
        #endregion

        public MenusController(MenuService menuService)
        {
            _menuService = menuService;
        }


        // GET: api/<controller>
        [HttpGet]
        public async Task<JsonResult> GetAsync()
        {
            Dictionary<Menu, List<Menu>> menuDatas = await this._menuService.GetAllMenusAsync();
            List<MenuDto> results = new List<MenuDto>();
            foreach (KeyValuePair<Menu, List<Menu>> item in menuDatas)
            {
                MenuDto mainMenu = new MenuDto();
                mainMenu.Title = item.Key.Name;
                mainMenu.IconType = item.Key.IconType;
                mainMenu.Path = item.Key.Path;
                mainMenu.MenuItems = new List<MenuItemDto>();
                foreach (Menu valueItem in item.Value)
                {
                    MenuItemDto menuItem = new MenuItemDto();
                    menuItem.Title = valueItem.Name;
                    menuItem.Path = valueItem.Path;
                    mainMenu.MenuItems.Add(menuItem);
                }
                results.Add(mainMenu);
            }

            return new JsonResult(results);
            //return new JsonResult(new List<string>() { "a", "b", "c" });
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
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
