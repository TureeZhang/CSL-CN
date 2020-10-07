"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var clipboard_response_1 = require("../../models/clipboard-response");
var drawer_statu_service_1 = require("../../services/drawer-statu.service");
var uploader_usage_enum_1 = require("../../models/uploader-usage.enum");
var UploaderComponent = /** @class */ (function () {
    function UploaderComponent(qiniuUploadService, http, globalService, imgService, clipboardService, drawerRef, httpHelper) {
        var _this = this;
        this.qiniuUploadService = qiniuUploadService;
        this.http = http;
        this.globalService = globalService;
        this.imgService = imgService;
        this.clipboardService = clipboardService;
        this.drawerRef = drawerRef;
        this.httpHelper = httpHelper;
        this.fileList = [];
        this.isShowUploadButton = true;
        this.host = this;
        this.imageMarkdownString = null;
        this.directoryPath = "shared";
        this.usage = uploader_usage_enum_1.UploaderUsageEnum.wiki;
        this.customRequest = function (item) { return __awaiter(_this, void 0, void 0, function () {
            var uploadFullName, token, formData, req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadFullName = this.directoryPath + "/" + item.file.name;
                        token = null;
                        return [4 /*yield*/, this.qiniuUploadService.getUploadToken(uploadFullName).then(function (data) { return token = data; })];
                    case 1:
                        _a.sent();
                        formData = new FormData();
                        if (token === "use-local-storage") {
                            formData.append('file', item.file);
                            item.action = this.httpHelper.getHostUrl() + "/api/upload/localstorage";
                        }
                        else {
                            // Create a FormData here to store files and other parameters.
                            // tslint:disable-next-line:no-any
                            formData.append('file', item.file);
                            formData.append('key', uploadFullName);
                            formData.append('token', token);
                        }
                        req = new http_1.HttpRequest('POST', item.action, formData, {
                            reportProgress: true,
                            withCredentials: false
                        });
                        // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
                        return [2 /*return*/, this.http.request(req).subscribe(
                            // tslint:disable-next-line no-any
                            function (event) {
                                if (event.type === http_1.HttpEventType.UploadProgress) {
                                    if (event.total > 0) {
                                        // tslint:disable-next-line:no-any
                                        event.percent = (event.loaded / event.total) * 100;
                                    }
                                    item.onProgress(event, item.file);
                                }
                                else if (event instanceof http_1.HttpResponse) {
                                    item.onSuccess(event.body, item.file, event);
                                }
                            }, function (err) {
                                item.onError(err, item.file);
                            })];
                }
            });
        }); };
    }
    UploaderComponent.prototype.ngOnInit = function () {
    };
    UploaderComponent.prototype.showFilesArray = function () {
        console.log(this.fileList);
    };
    UploaderComponent.prototype.onUploadStatusChanged = function (data) {
        if (data.type === "start") {
            this.isShowUploadButton = false;
            if (this.fileList.length > 1 && (data.file.name === this.fileList[0].name)) {
                this.fileList.pop();
            }
        }
        if (data.type === "failure") {
            this.isShowUploadButton = true;
        }
        if (data.type === "success") {
            var storageInfo = data.file.response.info;
            this.imageMarkdownString = this.getImageMarkdownString(storageInfo.FullName);
            this.fileUrl = this.imgService.getFileUrl(storageInfo.FullName);
        }
    };
    UploaderComponent.prototype.getImageMarkdownString = function (storageFullName) {
        var markdown = this.imgService.getCdnMarkdownString(storageFullName);
        return markdown;
    };
    UploaderComponent.prototype.copyMarkDownToClipboard = function () {
        this.clipboardService.copy(this.imageMarkdownString);
        var copyResponse = new clipboard_response_1.ClipboardResponse();
        this.clipboardService.pushCopyReponse(copyResponse);
        this.closeDrawer();
    };
    UploaderComponent.prototype.closeDrawer = function (fileUrl) {
        if (fileUrl === void 0) { fileUrl = null; }
        if (this.usage.toString() == uploader_usage_enum_1.UploaderUsageEnum.userAvatar.toString() && drawer_statu_service_1.DrawerStatuService.createUserDrawerRef != null) {
            drawer_statu_service_1.DrawerStatuService.createUserDrawerRef.nzOffsetX = 0;
        }
        this.drawerRef.close(fileUrl);
    };
    UploaderComponent.prototype.confirmUserAvatar = function () {
        this.closeDrawer(this.fileUrl);
    };
    __decorate([
        core_1.Input()
    ], UploaderComponent.prototype, "directoryPath", void 0);
    __decorate([
        core_1.Input()
    ], UploaderComponent.prototype, "usage", void 0);
    UploaderComponent = __decorate([
        core_1.Component({
            selector: 'uploader',
            templateUrl: './uploader.component.html',
            styleUrls: ['./uploader.component.css']
        })
    ], UploaderComponent);
    return UploaderComponent;
}());
exports.UploaderComponent = UploaderComponent;
//# sourceMappingURL=uploader.component.js.map