using Microsoft.EntityFrameworkCore.Migrations;

namespace HanJie.CSLCN.Datas.Migrations
{
    public partial class DonatorRankOrderId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "OrderId",
                table: "DonatorRanks",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "OrderId",
                table: "DonatorRanks",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 128);
        }
    }
}
