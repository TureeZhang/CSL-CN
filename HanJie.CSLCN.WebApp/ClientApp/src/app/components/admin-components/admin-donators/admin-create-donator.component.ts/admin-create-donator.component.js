"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AdminCreateDonatorComponent = /** @class */ (function () {
    function AdminCreateDonatorComponent(userInfoService, adminDonatorService, drawerRef, formBuilder) {
        this.userInfoService = userInfoService;
        this.adminDonatorService = adminDonatorService;
        this.drawerRef = drawerRef;
        this.formBuilder = formBuilder;
        this.loadingUsers = true;
        this.donatorForm = this.formBuilder.group({
            userId: ['', [forms_1.Validators.required]],
            paymentCompany: ['', [forms_1.Validators.required]],
            donateTotalCount: ['', [forms_1.Validators.required, forms_1.Validators.min(0.01)]],
            paymentUserNameSecretly: ['', [forms_1.Validators.required]],
            paymentAccountSecretly: ['', [forms_1.Validators.required]],
            orderId: ['', [forms_1.Validators.required]]
        });
    }
    AdminCreateDonatorComponent.prototype.ngOnInit = function () {
        this.getUserInfoes();
    };
    AdminCreateDonatorComponent.prototype.getUserInfoes = function () {
        var _this = this;
        this.userInfoService.getUserInfoes().subscribe(function (response) {
            _this.userInfoes = response;
            _this.loadingUsers = false;
        });
    };
    AdminCreateDonatorComponent.prototype.submitForm = function (data) {
        var _this = this;
        for (var item in this.donatorForm.controls) {
            this.donatorForm.controls[item].markAsDirty(); //标记为已触碰并修改
            this.donatorForm.controls[item].updateValueAndValidity(); //再次执行校验
        }
        console.log(data);
        this.adminDonatorService.create(data).subscribe(function (response) {
            console.log(response);
            _this.drawerRef.close(response);
        });
    };
    AdminCreateDonatorComponent.prototype.resetForm = function (e) {
        e.preventDefault();
        this.donatorForm.reset();
        for (var key in this.donatorForm.controls) {
            this.donatorForm.controls[key].markAsPristine();
            this.donatorForm.controls[key].updateValueAndValidity();
        }
    };
    AdminCreateDonatorComponent = __decorate([
        core_1.Component({
            selector: 'admin-create-donator',
            templateUrl: './admin-create-donator.component.html',
            styleUrls: ['./admin-create-donator.component.css']
        })
    ], AdminCreateDonatorComponent);
    return AdminCreateDonatorComponent;
}());
exports.AdminCreateDonatorComponent = AdminCreateDonatorComponent;
//# sourceMappingURL=admin-create-donator.component.js.map