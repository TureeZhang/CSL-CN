using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using HanJie.CSLCN.Models;
using Microsoft.EntityFrameworkCore;
using HanJie.CSLCN.Datas;
using HanJie.CSLCN.Models.Common.AppSettings;
using HanJie.CSLCN.Models.DataModels;
using System;
using System.Linq;
using HanJie.CSLCN.Services;
using HanJie.CSLCN.Common;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Cors.Infrastructure;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Diagnostics;
using HanJie.CSLCN.Models.Enums;
using System.IO;

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
                (options => options.UseMySql(GlobalConfigs.AppSettings.ConnectionString), ServiceLifetime.Transient);  //b => b.MigrationsAssembly("HanJie.CSLCN.WebApp"))

            services.AddCors(setupAction =>
            {
                setupAction.AddPolicy("local-angular-app", builder =>
                {
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.WithOrigins("http://localhost:4200");
                    builder.Build();
                });
            });

            //注册单例对象
            this.RegisterSingletons(ref services);
            //注册作用域对象
            this.RegisterScoped(ref services);
            //注册每次访问都返回一个新实例的对象
            this.RegisterTransient(ref services);

            //提供 服务提供 对象。
            GlobalService.ServiceProvider = services.BuildServiceProvider();
            //启动计划任务
            StartTask().GetAwaiter();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            if (!env.IsDevelopment())
            {
                ExceptionHandlerOptions exceptionHandlerOptions = new ExceptionHandlerOptions();
                exceptionHandlerOptions.ExceptionHandler = async (httpContext) =>
                {
                    await Task.Run(async () =>
                   {
                       try
                       {
                           IExceptionHandlerPathFeature exceptionPath = httpContext.Features.Get<IExceptionHandlerPathFeature>();
                           await new LogService().Log(exceptionPath.Error.ToString(), LogLevelEnum.Error);
                       }
                       catch (Exception ex)
                       {
                           _ = File.WriteAllTextAsync(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, $"logs_{DateTime.Now}.txt"), ex.ToString());
                           throw;
                       }
                   });
                };
                app.UseExceptionHandler(exceptionHandlerOptions);
            }

            app.UseCors("local-angular-app");
            app.UseFileServer();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseStatusCodePagesWithReExecute("/homepage/{0}");
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
            services.AddSingleton<CommonHelper>();
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
            services.AddScoped<SystemSettingService>();
            services.AddScoped<UserStatuService>();
            services.AddScoped<MenuService>();
            services.AddScoped<UserInfoService>();
            services.AddScoped<DonatorRankService>();
            services.AddScoped<QiniuService>();
            services.AddScoped<StorageService>();
            services.AddScoped<ClientAppService>();
            services.AddScoped<RedisService>();
            services.AddScoped<WikiCategoryService>();
        }

        /// <summary>
        /// 注册每次访问都返回一个新实例（Transient）的对象。
        /// 
        /// 备注：
        ///     对象在每次被调用时都会返回一个新实例。
        /// </summary>
        /// <param name="services"></param>
        private void RegisterTransient(ref IServiceCollection services)
        {
            services.AddTransient<WikiPassageService>();
        }

        /// <summary>
        /// 启动计划任务
        /// </summary>
        private async Task StartTask()
        {
            await WikiPassageService.StartViewsCountUpdateTask();
        }
    }
}
