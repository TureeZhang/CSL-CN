using Microsoft.EntityFrameworkCore.Migrations;

namespace HanJie.CSLCN.Datas.Migrations
{
    public partial class UpdateUserPwd50MaxLength : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "UserInfoes",
                maxLength: 64,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 16);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "UserInfoes",
                maxLength: 16,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 64);
        }
    }
}
