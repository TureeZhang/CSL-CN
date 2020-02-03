"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_info_service_1 = require("../../services/user-info.service");
var DonatorRankComponent = /** @class */ (function () {
    function DonatorRankComponent(donatorRankService, globalService) {
        this.donatorRankService = donatorRankService;
        this.globalService = globalService;
        this.loading = true;
        this.isAdmin = false;
    }
    DonatorRankComponent.prototype.ngOnInit = function () {
        this.getRanks();
        if (user_info_service_1.UserInfoService.currentUser) {
            this.isAdmin = user_info_service_1.UserInfoService.currentUser.isAdmin;
        }
    };
    DonatorRankComponent.prototype.getRanks = function () {
        var _this = this;
        this.donatorRankService.getRanks().subscribe(function (datas) {
            _this.donatorRanks = datas;
            _this.loading = false;
        });
    };
    DonatorRankComponent.prototype.setCustomerHeader = function (file) {
        //file.type = ""
    };
    DonatorRankComponent = __decorate([
        core_1.Component({
            selector: 'donator-rank',
            templateUrl: './donator-rank.component.html',
            styleUrls: ['./donator-rank.component.css']
        })
    ], DonatorRankComponent);
    return DonatorRankComponent;
}());
exports.DonatorRankComponent = DonatorRankComponent;
//# sourceMappingURL=donator-rank.component.js.map