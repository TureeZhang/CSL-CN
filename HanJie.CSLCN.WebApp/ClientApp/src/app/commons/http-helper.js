"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var CSLHttpHelper = /** @class */ (function () {
    function CSLHttpHelper(http) {
        this.http = http;
        /***
         *服务端主 host 地址段前缀
         ***/
        this.cslHostUrl = this.getHostUrl();
    }
    /**
     * 向服务端 API 发起 get 请求
     * @param url API 接口相对路径。eg. "/api/menus"
     */
    CSLHttpHelper.prototype.get = function (url) {
        var host = this;
        return this.http.get(this.cslHostUrl + url);
    };
    CSLHttpHelper.prototype.put = function (url, datas) {
        var host = this;
        return this.http.put(this.cslHostUrl + url, JSON.stringify(datas), {
            headers: new http_1.HttpHeaders().append("Content-Type", "application/json")
        });
    };
    /**
     * 向服务端 API 发起 post 请求
     * @param url API 接口相对路径。eg. "/api/menus"
     */
    CSLHttpHelper.prototype.post = function (url, datas) {
        var host = this;
        return this.http.post(this.cslHostUrl + url, JSON.stringify(datas), {
            headers: new http_1.HttpHeaders().append("Content-Type", "application/json")
        });
    };
    CSLHttpHelper.prototype.delete = function (url, id) {
        var host = this;
        return this.http.delete(this.cslHostUrl + url + "?id=" + id, {
            headers: new http_1.HttpHeaders().append("Content-Type", "application/json")
        });
    };
    CSLHttpHelper.prototype.getHostUrl = function () {
        var host = document.location.host;
        var apiHostUrl = "http://";
        if (host == "www.cities-skylines.cn") {
            apiHostUrl += "www.cities-skylines.cn";
        }
        else if (host == "www.huyahanjie.com") {
            apiHostUrl += "www.huyahanjie.com";
        }
        else {
            apiHostUrl += "localhost:5000";
        }
        return apiHostUrl;
    };
    CSLHttpHelper = __decorate([
        core_1.Injectable({ providedIn: "root" })
    ], CSLHttpHelper);
    return CSLHttpHelper;
}());
exports.CSLHttpHelper = CSLHttpHelper;
//# sourceMappingURL=http-helper.js.map