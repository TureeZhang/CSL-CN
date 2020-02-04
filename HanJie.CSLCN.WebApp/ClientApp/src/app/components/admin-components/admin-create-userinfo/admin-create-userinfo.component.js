"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var forms_1 = require("@angular/forms");
var uploader_component_1 = require("../../uploader/uploader.component");
var drawer_statu_service_1 = require("../../../services/drawer-statu.service");
var uploader_usage_enum_1 = require("../../../models/uploader-usage.enum");
var AdminCreateUserInfoComponent = /** @class */ (function () {
    function AdminCreateUserInfoComponent(formBuilder, userInfoService, drawerService, drawerRef) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.userInfoService = userInfoService;
        this.drawerService = drawerService;
        this.drawerRef = drawerRef;
        this.confirmPassword = function (control) {
            if (!control.value) {
                return { error: true, required: true };
            }
            else if (control.value != _this.userInfoForm.controls["password"].value) {
                return { error: true, confirm: true };
            }
            return {};
        };
        this.userNameAsyncValidator = function (control) {
            return new rxjs_1.Observable(function (observer) {
                if (_this.timerForUsernameDuplicated !== null) { //请求防抖
                    clearTimeout(_this.timerForUsernameDuplicated);
                }
                var userName = control.value;
                _this.timerForUsernameDuplicated = setTimeout(function () {
                    _this.userInfoService.isUserNameDuplicated(userName).subscribe(function (response) {
                        if (response === true) {
                            observer.next({ error: true, duplicated: true }); //必须返回 error:true 以标识此事件为校验错误
                        }
                        else {
                            observer.next(null);
                        }
                        observer.complete();
                    });
                }, 1000);
            });
        };
        this.userInfoForm = this.formBuilder.group({
            avatarUrl: ['', [forms_1.Validators.required]],
            nickName: ['', [forms_1.Validators.required]],
            userName: ['', [forms_1.Validators.required], [this.userNameAsyncValidator]],
            password: ['', [forms_1.Validators.required]],
            confirm: ['', [this.confirmPassword]],
            personalHomepageUrl: ['http://www.cities-skylines.cn'],
            isAdmin: [false]
        });
    }
    AdminCreateUserInfoComponent.prototype.ngOnInit = function () {
    };
    AdminCreateUserInfoComponent.prototype.validateConfirmPassword = function () {
        var _this = this;
        setTimeout(function () { _this.userInfoForm.controls["confirm"].updateValueAndValidity(); });
    };
    AdminCreateUserInfoComponent.prototype.submitForm = function (data) {
        var _this = this;
        for (var item in this.userInfoForm.controls) {
            this.userInfoForm.controls[item].markAsDirty(); //标记为已触碰并修改
            this.userInfoForm.controls[item].updateValueAndValidity(); //再次执行校验
        }
        console.log(data);
        this.userInfoService.create(data).subscribe(function (response) {
            console.log(response);
            _this.drawerRef.close(response);
        });
    };
    AdminCreateUserInfoComponent.prototype.openUploader = function () {
        var _this = this;
        drawer_statu_service_1.DrawerStatuService.createUserDrawerRef.nzOffsetX = 180;
        var drawerRef = this.drawerService.create({
            nzTitle: '上传用户头像',
            nzContent: uploader_component_1.UploaderComponent,
            nzPlacement: 'right',
            nzWidth: 320,
            nzMaskClosable: false,
            nzClosable: false,
            nzContentParams: {
                directoryPath: 'user-avatar',
                usage: uploader_usage_enum_1.UploaderUsageEnum.userAvatar
            },
        });
        drawerRef.afterOpen.subscribe(function () {
            console.log('Drawer(Component) open');
        });
        drawerRef.afterClose.subscribe(function (data) {
            console.log(data);
            if (typeof data === 'string') {
                console.log(data.toString());
                _this.userAvartarUrl = data;
            }
        });
    };
    AdminCreateUserInfoComponent.prototype.resetForm = function (e) {
        e.preventDefault();
        this.userInfoForm.reset();
        for (var key in this.userInfoForm.controls) {
            this.userInfoForm.controls[key].markAsPristine();
            this.userInfoForm.controls[key].updateValueAndValidity();
        }
    };
    AdminCreateUserInfoComponent = __decorate([
        core_1.Component({
            selector: 'admin-create-userinfo',
            templateUrl: './admin-create-userinfo.component.html',
            styleUrls: ['./admin-create-userinfo.component.css']
        })
    ], AdminCreateUserInfoComponent);
    return AdminCreateUserInfoComponent;
}());
exports.AdminCreateUserInfoComponent = AdminCreateUserInfoComponent;
//# sourceMappingURL=admin-create-userinfo.component.js.map