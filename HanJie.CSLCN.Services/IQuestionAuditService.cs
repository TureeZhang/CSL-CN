using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public interface IQuestionAuditService
    {
        Task AuditOK(int id, int auditorUserId);
        Task Rejected(int id, string reason, int auditorUserId);
    }
}