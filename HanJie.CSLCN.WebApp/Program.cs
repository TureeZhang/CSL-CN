using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HanJie.CSLCN.Common;
using HanJie.CSLCN.Services.BackgroundTasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace HanJie.CSLCN.WebApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine($"RunAs.Debug:{RunAs.Debug.ToString()}");
            Console.WriteLine($"RunAs.Release:{RunAs.Release.ToString()}");
            string configFile = RunAs.Debug ? "appsettings.Debug.json" : "appsettings.Release.json";
            Console.WriteLine($"configFile:{configFile}");
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {

            return WebHost.CreateDefaultBuilder(args)
                     .ConfigureAppConfiguration((hostingContext, config) =>
                     {
                         config.SetBasePath(Directory.GetCurrentDirectory());
                         config.AddJsonFile(RunAs.Debug ? "appsettings.Debug.json" : "appsettings.Release.json", optional: true, reloadOnChange: true);
                     })
                     .UseStartup<Startup>()
                     .UseUrls("http://0.0.0.0:5500")
                     .ConfigureServices((hostContext, services) =>
                     {
                         services.AddHostedService<ViewersCountTask>();
                     });
        }
    }
}
