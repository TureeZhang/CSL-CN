namespace HanJie.CSLCN.Common
{
    public interface ICommonHelper
    {
        string GetMd5Base64StringUsePrivateSold(string content);
        bool IsValidHostValue(string hostValue);
    }
}