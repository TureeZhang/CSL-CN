using HanJie.CSLCN.Common;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;
using HanJie.CSLCN.Models.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public class MenuService : BaseService<MenuDto, Menu>, IMenuService
    {
        public MenuService(CSLDbContext cslDbContext, ICommonHelper commonHelper)
            : base(cslDbContext, commonHelper)
        {

        }
        public async Task AddMainMenuAsync(string name)
        {
            if (string.IsNullOrEmpty(name))
                throw new ArgumentException("顶层菜单的标题是必须的。", nameof(name));

            Menu menu = new Menu();
            menu.MenuType = MenuTypeEnum.MainMenu;
            menu.Name = name;
            menu.ParentId = 0;

            await base.AddAsync(menu);
        }

        public async Task AddFirstChildMenuAsync(string name, int parentId)
        {
            if (string.IsNullOrEmpty(name))
                throw new ArgumentException("一级菜单的标题是必须的。", nameof(name));
            if (parentId <= 0)
                throw new ArgumentOutOfRangeException(nameof(parentId), parentId, "父级分类的 ID 应当大于 0 。");

            Menu menu = new Menu();
            menu.MenuType = MenuTypeEnum.FirstChild;
            menu.Name = name;
            menu.ParentId = parentId;

            await base.AddAsync(menu);
        }

        /// <summary>
        /// 获取完整的主目录键值对
        /// </summary>
        public async Task<Dictionary<Menu, List<Menu>>> GetAllMenusAsync()
        {
            Dictionary<Menu, List<Menu>> resultDic = new Dictionary<Menu, List<Menu>>();

            Dictionary<int, List<Menu>> queryDic = new Dictionary<int, List<Menu>>();
            List<Menu> mainMenus = await GetAllMainMenusAsync() ?? throw new Exception("不存在顶层菜单");
            List<Menu> firstChilds = await GetAllFirstChildsAsync();

            foreach (Menu item in mainMenus)
            {
                queryDic.Add(item.Id, new List<Menu>());
            }
            foreach (Menu item in firstChilds)
            {
                queryDic[item.ParentId].Add(item);
            }

            foreach (KeyValuePair<int, List<Menu>> item in queryDic)
            {
                resultDic.Add(mainMenus.Where(m => m.Id == item.Key).FirstOrDefault(), queryDic[item.Key]);
            }

            return resultDic;
        }

        /// <summary>
        /// 获取所有顶层目列表
        /// </summary>
        /// <returns></returns>
        public async Task<List<Menu>> GetAllMainMenusAsync()
        {
            List<Menu> results = null;

            results = await CSLDbContext.Menus.Where(m => m.MenuType == MenuTypeEnum.MainMenu).AsNoTracking().ToListAsync();
            return results;
        }

        /// <summary>
        /// 获取所有一级目录列表
        /// </summary>
        /// <returns></returns>
        public async Task<List<Menu>> GetAllFirstChildsAsync()
        {
            List<Menu> results = new List<Menu>();

            results = await CSLDbContext.Menus.Where(m => m.MenuType == MenuTypeEnum.FirstChild).AsNoTracking().ToListAsync();
            return results;
        }
    }
}
