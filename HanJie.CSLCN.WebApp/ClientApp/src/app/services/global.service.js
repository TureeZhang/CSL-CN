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
var GlobalService = /** @class */ (function () {
    function GlobalService(httpHelper, messageService, clipboardService) {
        this.httpHelper = httpHelper;
        this.messageService = messageService;
        this.clipboardService = clipboardService;
        this.configsUrl = "/api/configs";
        this.onBreadCrumbReady = new core_1.EventEmitter();
        this.initConfigs();
        this.handleCopyResponseTip();
    }
    GlobalService.prototype.initConfigs = function () {
        var host = this;
        this.httpHelper.get(this.configsUrl).subscribe(function (response) {
            host.clientAppConfigs = response;
        });
    };
    GlobalService.prototype.successTip = function (message) {
        this.messageService.create("success", message);
    };
    GlobalService.prototype.ErrorTip = function (message) {
        this.messageService.create("error", message);
    };
    GlobalService.prototype.WarningTip = function (message) {
        this.messageService.create("warning", message);
    };
    GlobalService.prototype.handleCopyResponseTip = function () {
        var _this = this;
        this.clipboardService.copyResponse$.subscribe(function (result) {
            if (result.isSuccess) {
                _this.successTip("复制成功");
            }
            //else {
            //  this.ErrorTip("复制失败：请手动复制所需内容。");
            //}
        });
    };
    GlobalService.prototype.setBreadCrumbs = function (breadCrumbs) {
        this.onBreadCrumbReady.emit(new rxjs_1.Observable(function (observer) {
            observer.next(breadCrumbs);
            observer.complete();
        }));
    };
    GlobalService = __decorate([
        core_1.Injectable({ providedIn: "root" })
    ], GlobalService);
    return GlobalService;
}());
exports.GlobalService = GlobalService;
//# sourceMappingURL=global.service.js.map