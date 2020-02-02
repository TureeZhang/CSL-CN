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
var admin_create_userinfo_component_1 = require("../admin-create-userinfo/admin-create-userinfo.component");
var drawer_statu_service_1 = require("../../../services/drawer-statu.service");
var AdminUserInfoesComponent = /** @class */ (function () {
    function AdminUserInfoesComponent(adminUserInfoService, drawerService, globalService) {
        this.adminUserInfoService = adminUserInfoService;
        this.drawerService = drawerService;
        this.globalService = globalService;
        this.loading = true;
    }
    AdminUserInfoesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminUserInfoService.list().subscribe(function (response) {
            _this.datas = response;
            _this.loading = false;
        });
    };
    AdminUserInfoesComponent.prototype.createUser = function () {
        var _this = this;
        var drawerRef = this.drawerService.create({
            nzTitle: '添加用户',
            nzContent: admin_create_userinfo_component_1.AdminCreateUserInfoComponent,
            nzPlacement: 'right',
            nzWidth: 320,
            nzMaskClosable: false,
            nzContentParams: {},
        });
        drawerRef.afterOpen.subscribe(function () {
            console.log('Drawer(Component) open');
        });
        drawerRef.afterClose.subscribe(function (data) {
            drawer_statu_service_1.DrawerStatuService.createUserDrawerRef = null;
            console.log(data);
            //注意#
            //按照 Angular 的设计，当需要对 nzData 中的数据进行增删时需要使用以下操作，使用 push 或者 splice 修改 nzData 的数据不会生效
            //// 增加数据
            //this.dataSet = [...this.dataSet, {
            //  key: `${this.i}`,
            //  name: `Edward King ${this.i}`,
            //  age: '32',
            //  address: `London, Park Lane no. ${this.i}`
            //}];
            //// 删除数据
            //this.dataSet = this.dataSet.filter(d => d.key !== i);
            _this.datas = __spreadArrays(_this.datas, [data]);
            _this.globalService.successTip("\u65B0\u589E\u7528\u6237\u6210\u529F\uFF1A" + data.nickName + "(" + data.userName + ")");
        });
        drawer_statu_service_1.DrawerStatuService.createUserDrawerRef = drawerRef;
    };
    AdminUserInfoesComponent = __decorate([
        core_1.Component({
            selector: 'admin-userinfoes',
            templateUrl: './admin-userinfoes.component.html',
            styleUrls: ['./admin-userinfoes.component.css']
        })
    ], AdminUserInfoesComponent);
    return AdminUserInfoesComponent;
}());
exports.AdminUserInfoesComponent = AdminUserInfoesComponent;
//# sourceMappingURL=admin-userinfoes.component.js.map