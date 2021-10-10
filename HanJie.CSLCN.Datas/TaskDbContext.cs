using System;
using Microsoft.EntityFrameworkCore;

namespace HanJie.CSLCN.Datas
{
    public class TaskDbContext : CSLDbContext
    {
        public TaskDbContext(DbContextOptions<CSLDbContext> options)
            : base(options)
        {

        }
    }
}
