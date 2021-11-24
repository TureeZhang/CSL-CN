using System.Threading.Tasks;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IWikiPassageCommentService
    {
        Task Create(WikiPassageCommentDto comment);
        Task Delete(int id,int currentUserId);
    }
}