using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HanJie.CSLCN.Datas.Migrations
{
    public partial class CreateUserAndMenuTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    LastModifyDate = table.Column<DateTime>(nullable: false),
                    MenuType = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    ParentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserInfoes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    LastModifyDate = table.Column<DateTime>(nullable: false),
                    UserName = table.Column<string>(maxLength: 16, nullable: false),
                    Password = table.Column<string>(maxLength: 16, nullable: false),
                    NickName = table.Column<string>(maxLength: 24, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserInfoes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Menus");

            migrationBuilder.DropTable(
                name: "UserInfoes");
        }
    }
}
