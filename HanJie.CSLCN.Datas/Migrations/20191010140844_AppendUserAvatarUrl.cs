using Microsoft.EntityFrameworkCore.Migrations;

namespace HanJie.CSLCN.Datas.Migrations
{
    public partial class AppendUserAvatarUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "UserInfoes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "UserInfoes");
        }
    }
}
