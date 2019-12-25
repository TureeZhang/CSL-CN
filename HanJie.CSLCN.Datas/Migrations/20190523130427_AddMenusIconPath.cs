using Microsoft.EntityFrameworkCore.Migrations;

namespace HanJie.CSLCN.Datas.Migrations
{
    public partial class AddMenusIconPath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "Menus",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "Menus",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Icon",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "Path",
                table: "Menus");
        }
    }
}
