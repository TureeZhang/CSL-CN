"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var admin_create_userinfo_component_1 = require("../admin-create-userinfo/admin-create-userinfo.component");
var AdminUserInfoesComponent = /** @class */ (function () {
    function AdminUserInfoesComponent(adminUserInfoService, drawerService) {
        this.adminUserInfoService = adminUserInfoService;
        this.drawerService = drawerService;
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
        var drawerRef = this.drawerService.create({
            nzTitle: '添加用户',
            nzContent: admin_create_userinfo_component_1.AdminCreateUserInfoComponent,
            nzPlacement: 'right',
            nzContentParams: {},
        });
        drawerRef.afterOpen.subscribe(function () {
            console.log('Drawer(Component) open');
        });
        drawerRef.afterClose.subscribe(function (data) {
            console.log(data);
            if (typeof data === 'string') {
                console.log(data.toString());
                //this.value = data;
            }
        });
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