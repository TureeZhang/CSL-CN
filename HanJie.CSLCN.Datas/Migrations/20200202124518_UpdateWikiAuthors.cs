using Microsoft.EntityFrameworkCore.Migrations;

namespace HanJie.CSLCN.Datas.Migrations
{
    public partial class UpdateWikiAuthors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "WikiPassages");

            migrationBuilder.AddColumn<string>(
                name: "MainAuthors",
                table: "WikiPassages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CoAuthors",
                table: "WikiPassages",
                nullable: true);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoAuthors",
                table: "WikiPassages");

            migrationBuilder.RenameColumn(
                name: "MainAuthors",
                table: "WikiPassages",
                newName: "Author");
        }
    }
}
