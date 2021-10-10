using System.Collections.Generic;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IWikiCategoryService
    {
        Task<WikiCategory> GetById(int categoryId);
        Task<List<WikiCategoryDto>> ListDtos();
    }
}