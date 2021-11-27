using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public interface IQuestionAuditService
    {
        void AuditOK(int id, int auditorUserId);
        void Rejected(int id, string reason, int auditorUserId);
    }
}