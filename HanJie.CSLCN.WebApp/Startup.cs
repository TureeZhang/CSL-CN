using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
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
using HanJie.CSLCN.WebApp.MyFilters;
using HanJie.CSLCN.Plugins.Interfaces;
using System.Reflection;
using Microsoft.Extensions.Logging;
using HanJie.CSLCN.Plugins.Officials;

namespace HanJie.CSLCN.WebApp
{
    public class Startup
    {
        private List<Type> _plugins;
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
            Globalinitialize();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                options.Filters.Add(new RequestLogFilter());
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the Angular files will be served from this directory
            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "ClientApp/dist";
            //});

            //https://stackoverflow.com/questions/38238043/how-and-where-to-call-database-ensurecreated-and-database-migrate
            //CSLDbContext.Instance.Database.EnsureCreated();
            //CSLDbContext.Instance.Database.Migrate();

            //�����ݿ������Ķ������DI����
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

            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddSeq("http://localhost:5341");
            });

            //ע�ᵥ������
            this.RegisterSingletons(ref services);
            //ע�����������
            this.RegisterScoped(ref services);
            //ע��ÿ�η��ʶ�����һ����ʵ���Ķ���
            this.RegisterTransient(ref services);

            //�ṩ �����ṩ ����
            GlobalService.ServiceProvider = services.BuildServiceProvider();
            //����ƻ�����
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
            app.UseRouting();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseStatusCodePagesWithReExecute("/homepage/{0}");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
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
        /// �� Startup ���캯�������ȫ����Ҫ�ĳ�ʼ��������
        /// </summary>
        private void Globalinitialize()
        {
            //�� AppSettings.json �����ļ��е�ֵ�󶨵�ǿ����ģ��
            GlobalConfigs.AppSettings = this.Configuration.GetSection("AppSettings").Get<AppSettings>();
        }

        /// <summary>
        /// ע�ᵥ������
        /// 
        /// ��ע��
        ///     ����ȫ��ȫ���Ա�ͷ��ʹ����������һ�Σ��κε��ýԷ���ͬһ������������Ϊ������������������
        /// </summary>
        /// <param name="services"></param>
        private void RegisterSingletons(ref IServiceCollection services)
        {
            services.AddSingleton<CommonHelper>();
            services.AddSingleton<SensitiveWordHelper>();
        }

        /// <summary>
        /// ע��������(scope)����
        /// 
        /// ��ע��
        ///     ������ÿ�������ڼ䴴��һ�Ρ�
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
        /// ע��ÿ�η��ʶ�����һ����ʵ����Transient���Ķ���
        /// 
        /// ��ע��
        ///     ������ÿ�α�����ʱ���᷵��һ����ʵ����
        /// </summary>
        /// <param name="services"></param>
        private void RegisterTransient(ref IServiceCollection services)
        {
            services.AddTransient<WikiPassageService>();
            services.AddScoped<SMSService>();
        }

        /// <summary>
        /// ����ƻ�����
        /// </summary>
        private async Task StartTask()
        {
            await WikiPassageService.StartViewsCountUpdateTask();
            RequestLogFilter.StartIPsCount();
        }

    }
}
