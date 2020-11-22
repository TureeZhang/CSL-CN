using HanJie.CSLCN.Models.Dtos;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HanJie.CSLCN.WebApp.MyFilters
{
    public class RequestLogFilter : ActionFilterAttribute
    {

        private static ConcurrentDictionary<string, List<RequestInfo>> _ips = new ConcurrentDictionary<string, List<RequestInfo>>();

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            RequestInfo requestInfo = new RequestInfo();
            requestInfo.IpAddress = context.HttpContext.Connection.RemoteIpAddress.ToString(); ;
            requestInfo.Url = context.HttpContext.Request.Headers["Referer"].ToString();
            requestInfo.UserAgent = context.HttpContext.Request.Headers["User-Agent"].ToString();

            if (_ips.ContainsKey(requestInfo.IpAddress))
            {
                _ips[requestInfo.IpAddress].Add(requestInfo);
            }
            else
            {
                List<RequestInfo> requestInfos = new List<RequestInfo>();
                requestInfos.Add(requestInfo);
                _ips.TryAdd(requestInfo.IpAddress, requestInfos);
            }


        }

        public static void StartIPsCount()
        {
            Task.Run(() =>
            {
                while (true)
                {
                    string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ips.txt");
                    File.WriteAllText(path, JsonConvert.SerializeObject(_ips.OrderByDescending(item => item.Value.Count)));
                    Thread.Sleep(10 * 60 * 1000);
                }
            });


        }

    }
}
