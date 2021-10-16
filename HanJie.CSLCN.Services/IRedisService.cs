using System.Threading.Tasks;

namespace HanJie.CSLCN.Services
{
    public interface IRedisService
    {
        T ObjectGet<T>(string key) where T : class, new();
        Task<bool> ObjectSetAsync<T>(string key, T value) where T : class, new();
    }
}