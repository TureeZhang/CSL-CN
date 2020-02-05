"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var admin_create_donator_component_1 = require("./admin-create-donator.component.ts/admin-create-donator.component");
var AdminDonatorsComponent = /** @class */ (function () {
    function AdminDonatorsComponent(donatorService, drawerService, globalService) {
        this.donatorService = donatorService;
        this.drawerService = drawerService;
        this.globalService = globalService;
        this.loading = true;
    }
    AdminDonatorsComponent.prototype.ngOnInit = function () {
        this.getDonators();
    };
    AdminDonatorsComponent.prototype.getDonators = function () {
        var _this = this;
        this.donatorService.getDonators().subscribe(function (response) {
            _this.datas = response;
            _this.loading = false;
        });
    };
    AdminDonatorsComponent.prototype.createDonator = function () {
        var _this = this;
        var drawerRef = this.drawerService.create({
            nzTitle: '添加捐赠',
            nzContent: admin_create_donator_component_1.AdminCreateDonatorComponent,
            nzPlacement: 'right',
            nzWidth: 320,
            nzContentParams: {},
        });
        drawerRef.afterOpen.subscribe(function () {
            console.log('Drawer(Component) open');
        });
        drawerRef.afterClose.subscribe(function (data) {
            console.log(data);
            if (data != null) {
                _this.datas = __spreadArrays(_this.datas, [data]);
                _this.globalService.successTip("\u6350\u8D60\u4FE1\u606F\u5DF2\u66F4\u65B0\uFF1A" + data.userNickName + "\uFF08\uFFE5" + data.donateTotalCount + "\uFF09\u3002");
            }
        });
    };
    AdminDonatorsComponent = __decorate([
        core_1.Component({
            selector: 'admin-donators',
            templateUrl: './admin-donators.component.html',
            styleUrls: ['./admin-donators.component.css']
        })
    ], AdminDonatorsComponent);
    return AdminDonatorsComponent;
}());
exports.AdminDonatorsComponent = AdminDonatorsComponent;
//# sourceMappingURL=admin-donators.component.js.map