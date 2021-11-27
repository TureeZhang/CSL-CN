using System.Collections.Generic;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;

namespace HanJie.CSLCN.Services
{
    public interface IMenuService
    {
        void AddFirstChildMenu(string name, int parentId);
        void AddMainMenu(string name);
        List<Menu> GetAllFirstChilds();
        List<Menu> GetAllMainMenus();
        Dictionary<Menu, List<Menu>> GetAllMenus();
    }
}