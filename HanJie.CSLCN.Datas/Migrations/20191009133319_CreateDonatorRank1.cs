using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HanJie.CSLCN.Datas.Migrations
{
    public partial class CreateDonatorRank1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DonatorRanks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    LastModifyDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    DonateTotalCount = table.Column<decimal>(nullable: false),
                    PersonalTitle = table.Column<string>(nullable: true),
                    DescriptionWord = table.Column<string>(nullable: true),
                    PaymentCompany = table.Column<int>(nullable: false),
                    PaymentUserNameSecretly = table.Column<string>(nullable: true),
                    PaymentAccountSecretly = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonatorRanks", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DonatorRanks");
        }
    }
}
