using System.Threading.Tasks;
using HanJie.CSLCN.Models.Dtos;

namespace HanJie.CSLCN.Services
{
    public interface IWikiPassageCommentService
    {
        void Create(WikiPassageCommentDto comment);
        void Delete(int id,int currentUserId);
    }
}