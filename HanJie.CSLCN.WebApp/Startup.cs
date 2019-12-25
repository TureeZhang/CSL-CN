using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using HanJie.CSLCN.Models;
using Microsoft.EntityFrameworkCore;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.Common;
using HanJie.CSLCN.Models.DataModels;
using System;
using System.Linq;
using HanJie.CSLCN.Services;
using HanJie.CSLCN.Common;
using Microsoft.AspNetCore.HttpOverrides;

namespace HanJie.CSLCN.WebApp
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
            Globalinitialize();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the Angular files will be served from this directory
            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "ClientApp/dist";
            //});

            //https://stackoverflow.com/questions/38238043/how-and-where-to-call-database-ensurecreated-and-database-migrate
            //CSLDbContext.Instance.Database.EnsureCreated();
            //CSLDbContext.Instance.Database.Migrate();

            //将数据库上下文对象加入DI容器
            Console.WriteLine($"ConnStr:{GlobalConfigs.AppSettings.ConnectionString}");
            services.AddDbContext<CSLDbContext>
                (options => options.UseMySql(GlobalConfigs.AppSettings.ConnectionString));  //b => b.MigrationsAssembly("HanJie.CSLCN.WebApp"))

            //注册单例对象
            this.RegisterSingletons(ref services);
            //注册作用域对象
            this.RegisterScoped(ref services);

            //提供 服务提供 对象。
            GlobalService.ServiceProvider = services.BuildServiceProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseFileServer();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            //app.UseSpa(spa =>
            //{
            //    // To learn more about options for serving an Angular SPA from ASP.NET Core,
            //    // see https://go.microsoft.com/fwlink/?linkid=864501

            //    spa.Options.SourcePath = "ClientApp";

            //    if (env.IsDevelopment())
            //    {
            //        spa.UseAngularCliServer(npmScript: "start");
            //    }
            //});

        }

        /// <summary>
        /// 在 Startup 构造函数中完成全局重要的初始化操作。
        /// </summary>
        private void Globalinitialize()
        {
            //将 AppSettings.json 配置文件中的值绑定到强类型模型
            GlobalConfigs.AppSettings = this.Configuration.GetSection("AppSettings").Get<AppSettings>();
        }

        /// <summary>
        /// 注册单例对象。
        /// 
        /// 备注：
        ///     对象全局全体成员和访问共享，仅创建一次，任何调用皆返回同一对象，生命周期为程序启动至程序结束。
        /// </summary>
        /// <param name="services"></param>
        private void RegisterSingletons(ref IServiceCollection services)
        {
            services.AddSingleton<MenuService>();
            services.AddSingleton<UserInfoService>();
            services.AddSingleton<UserStatuService>();
            services.AddSingleton<DonatorRankService>();
        }

        /// <summary>
        /// 注册作用域(scope)对象。
        /// 
        /// 备注：
        ///     对象在每个请求期间创建一次。
        /// </summary>
        /// <param name="services"></param>
        private void RegisterScoped(ref IServiceCollection services)
        {
            services.AddScoped<WikiPassageService>();
        }
    }
}
