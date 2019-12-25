using Microsoft.EntityFrameworkCore.Migrations;

namespace HanJie.CSLCN.Datas.Migrations
{
    public partial class AppendWikiPassageAuthorRoutePath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "WikiPassages",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "RoutePath",
                table: "WikiPassages",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "WikiPassages");

            migrationBuilder.DropColumn(
                name: "RoutePath",
                table: "WikiPassages");
        }
    }
}
