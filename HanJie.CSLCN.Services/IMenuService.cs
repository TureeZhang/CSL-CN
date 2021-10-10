using System.Collections.Generic;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;

namespace HanJie.CSLCN.Services
{
    public interface IMenuService
    {
        Task AddFirstChildMenuAsync(string name, int parentId);
        Task AddMainMenuAsync(string name);
        Task<List<Menu>> GetAllFirstChildsAsync();
        Task<List<Menu>> GetAllMainMenusAsync();
        Task<Dictionary<Menu, List<Menu>>> GetAllMenusAsync();
    }
}