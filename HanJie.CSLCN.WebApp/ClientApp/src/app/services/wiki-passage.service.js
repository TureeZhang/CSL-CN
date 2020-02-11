"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WikiPassageService = /** @class */ (function () {
    function WikiPassageService(httpHelper) {
        this.httpHelper = httpHelper;
        this.wikiPassageUrl = "/api/wikipassages";
        this.wikiRoutePathValidateUrl = "/api/wikipassages/isduplicated";
        this.wikiLockPassageEditingStatusUrl = "/api/wikipassages/lockpassageeditingstatus";
        this.wikiImStillOnlineCallUrl = "/api/wikipassages/imstillonline";
    }
    WikiPassageService.prototype.ngOnInit = function () {
    };
    WikiPassageService.prototype.getWikiPassage = function (routePath) {
        return this.httpHelper.get(this.wikiPassageUrl + "/" + encodeURIComponent(routePath));
    };
    WikiPassageService.prototype.putWikiPassage = function (dto) {
        return this.httpHelper.put(this.wikiPassageUrl, dto);
    };
    WikiPassageService.prototype.postWikiPassage = function (dto) {
        return this.httpHelper.post(this.wikiPassageUrl, dto);
    };
    WikiPassageService.prototype.isRoutePathDuplicated = function (routePath) {
        return this.httpHelper.get(this.wikiRoutePathValidateUrl + "?routePath=" + routePath);
    };
    WikiPassageService.prototype.lockPassageEditingStatus = function (passageId) {
        return this.httpHelper.get(this.wikiLockPassageEditingStatusUrl + "?passageId=" + passageId);
    };
    WikiPassageService.prototype.imStillOnlineCall = function (passageId) {
        return this.httpHelper.get(this.wikiImStillOnlineCallUrl + "?passageId=" + passageId);
    };
    WikiPassageService = __decorate([
        core_1.Injectable({ providedIn: "root" })
    ], WikiPassageService);
    return WikiPassageService;
}());
exports.WikiPassageService = WikiPassageService;
//# sourceMappingURL=wiki-passage.service.js.map