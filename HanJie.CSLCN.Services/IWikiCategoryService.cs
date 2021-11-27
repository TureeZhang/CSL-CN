using System.Collections.Generic;
using System.Threading.Tasks;
using HanJie.CSLCN.Models.DataModels;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IWikiCategoryService
    {
        WikiCategory GetById(int categoryId);
        List<WikiCategoryDto> ListDtos();
    }
}