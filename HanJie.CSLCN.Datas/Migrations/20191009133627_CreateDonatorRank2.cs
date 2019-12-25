using Microsoft.EntityFrameworkCore.Migrations;

namespace HanJie.CSLCN.Datas.Migrations
{
    public partial class CreateDonatorRank2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PaymentUserNameSecretly",
                table: "DonatorRanks",
                maxLength: 64,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PaymentAccountSecretly",
                table: "DonatorRanks",
                maxLength: 64,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PaymentUserNameSecretly",
                table: "DonatorRanks",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 64);

            migrationBuilder.AlterColumn<string>(
                name: "PaymentAccountSecretly",
                table: "DonatorRanks",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 64);
        }
    }
}
