"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ImgService = /** @class */ (function () {
    function ImgService(globalService) {
        this.globalService = globalService;
    }
    ImgService.prototype.ngOnInit = function () {
    };
    ImgService.prototype.getCdnMarkdownString = function (storageFullName) {
        var imgUrl = this.getFileUrl(storageFullName);
        var result = "![" + storageFullName + "](" + imgUrl + ")";
        return result;
    };
    ImgService.prototype.getFileUrl = function (storageFullName) {
        var fileUrl = this.globalService.clientAppConfigs.qiniuCdnHostUri + "/" + storageFullName;
        return fileUrl;
    };
    ImgService = __decorate([
        core_1.Injectable({ providedIn: "root" })
    ], ImgService);
    return ImgService;
}());
exports.ImgService = ImgService;
//# sourceMappingURL=img.service.js.map