using HanJie.CSLCN.Models.DataModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace HanJie.CSLCN.Datas
{
    public class CSLDbContext : DbContext
    {
        /// <summary>
        /// 用户信息表
        /// </summary>
        public DbSet<UserInfo> UserInfoes { get; set; }

        /// <summary>
        /// 存储主要的维基文章所使用的数据库表。
        /// </summary>
        public DbSet<WikiPassage> WikiPassages { get; set; }
        /// <summary>
        /// 主菜单信息表
        /// </summary>
        public DbSet<Menu> Menus { get; set; }

        /// <summary>
        /// 捐赠者榜单
        /// </summary>
        public DbSet<DonatorRank> DonatorRanks { get; set; }

        /// <summary>
        /// 七牛云存储存放的文件信息
        /// </summary>
        public DbSet<QiniuStorageInfo> QiniuStorageInfoes { get; set; }

        /// <summary>
        /// 系统设置
        /// </summary>
        public DbSet<SystemSetting> SystemSettings { get; set; }

        /// <summary>
        /// 维基分类
        /// </summary>
        public DbSet<WikiCategory> WikiCategories { get; set; }

        /// <summary>
        /// 日志
        /// </summary>
        public DbSet<Log> Logs { get; set; }

        public CSLDbContext(DbContextOptions<CSLDbContext> options)
            : base(options)
        {

        }

        //public CSLDbContext(DbContextOptions<CSLDbContext> options)
        //    : base(options)
        //{ }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    //FluentAPI goes here.
        //    //优先使用 Attrbiute 标记，FluentAPI 优先级高于其他，在使用前请先仔细检查其他数据模型的标记情况。
        //    base.OnModelCreating(modelBuilder);
        //}

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    ////执行 Add-Migration 报错时，注释一下 if -else 代码段。（但要保留 base. 一行）
        //    ////if (AppDomain.CurrentDomain.BaseDirectory.Contains("HanJie.CSLCN.Tests"))    //如果从单元测试调用此构造函数，则采用内存中数据库
        //    ////{
        //    ////    var options = new DbContextOptionsBuilder<CSLDbContext>()
        //    ////        .UseInMemoryDatabase(databaseName: "Add_Writes_to_database")
        //    ////        .Options;
        //    ////    optionsBuilder.UseInMemoryDatabase("test");
        //    ////}
        //    ////else
        //    ////{
        //    string connStr = "User ID=csl-cn-debug;Password=7EBC8B5FB6C14509BC75F68824B22351;Host=118.31.20.44;Port=3306;Database=cslcn-dev;Min Pool Size=0;Max Pool Size=100;";

        //    if (RunAs.Release)
        //        connStr = GlobalConfigs.AppSettings.ConnectionString;

        //    optionsBuilder.UseMySql(connStr);
        //    ////}
        //    //base.OnConfiguring(optionsBuilder);
        //}

    }
}
