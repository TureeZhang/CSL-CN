"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var admin_homepage_card_1 = require("../../../models/admin/admin-homepage-card");
var AdminHomepageComponent = /** @class */ (function () {
    function AdminHomepageComponent() {
        this.data = new Array();
        this.init();
    }
    AdminHomepageComponent.prototype.init = function () {
        this.data.push(new admin_homepage_card_1.AdminHomepageCard("/admin/userinfoes", "userinfoAvatarTemplate", "用户", "查看并管理注册用户信息", "user"), new admin_homepage_card_1.AdminHomepageCard("/admin/donators", "donatorRankTemplate", "捐赠", "查看并管理捐赠者统计数据", "heart"), new admin_homepage_card_1.AdminHomepageCard("/admin/wikipassages", "wikiPassageTemplate", "文章", "查看并管理维基文档", "file-text"), new admin_homepage_card_1.AdminHomepageCard("/admin/storagefiles", "cloudFileTemplate", "文件", "查看并管理已上传文件", "cloud-upload"));
    };
    AdminHomepageComponent.prototype.ngOnInit = function () {
    };
    AdminHomepageComponent = __decorate([
        core_1.Component({
            selector: 'admin-homepage',
            templateUrl: './admin-homepage.component.html',
            styleUrls: ['./admin-homepage.component.css']
        })
    ], AdminHomepageComponent);
    return AdminHomepageComponent;
}());
exports.AdminHomepageComponent = AdminHomepageComponent;
//# sourceMappingURL=admin-homepage.component.js.map