import { Component, OnInit, ElementRef, ViewContainerRef } from '@angular/core';
import { MenuService } from './services/menu.service';
import { MenuDto } from './models/menu-dto';
import { Observable } from 'rxjs';
import { UserInfoDto } from './models/user-info-dto';
import { UserInfoService } from './services/user-info.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GlobalService } from './services/global.service';
import { BreadCrumbDto } from './models/bread-crumb';
import { HomepageSettingsDto } from './models/admin/homepage-settings-dto';
import { SystemSettingsService } from './services/system-settings.service';
import { SystemSettingTypeEnum } from './models/enums/system-setting-type-enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public isExiting: boolean = false;
    public isCollapsed: boolean = false;

    public isReverseArrow: boolean = false;
    public menus: MenuDto[];
    public currentUser: UserInfoDto;
    public isUserLogined: boolean = false;
    public navigationEnd: Observable<NavigationEnd>;
    public breadCrumbs: Observable<BreadCrumbDto[]>;
    public homepageSettings: HomepageSettingsDto;


    constructor(private menuService: MenuService,
        private userInfoService: UserInfoService,
        private router: Router,
        public globalService: GlobalService,
        private systemSettingsService: SystemSettingsService) {
        this.navigationEnd = router.events.pipe(
            filter(evt => evt instanceof NavigationEnd)
        ) as Observable<NavigationEnd>;
    }

    ngOnInit(): void {
        this.systemSettingsService.get<HomepageSettingsDto>(SystemSettingTypeEnum.HomePage).subscribe(response => {
            this.homepageSettings = response;
            document.body.style.cssText += `--menu-groupitem-background-color: ${this.homepageSettings.menuGroupitemBackgroundColor};`;
            document.body.style.cssText += `--menu-text-focus-color: ${this.homepageSettings.menuTextFocusColor};`;
            document.body.style.cssText += `--menu-background-focus-color: ${this.homepageSettings.menuBackgroundFocusColor};`;
            document.body.style.cssText += `--menu-text-color: ${this.homepageSettings.menuTextColor};`;
            document.body.style.cssText += `--menu-group-text-color: ${this.homepageSettings.menuGroupTextColor};`;
            document.body.style.cssText += `--menu-hover-color: ${this.homepageSettings.menuHoverColor};`;
            document.body.style.cssText += `--menu-hover-backgroundcolor: ${this.homepageSettings.menuHoverBackgroundColor};`;


        });
        this.getMenus();

        if (this.currentUser == null) {
            this.tryRestoreLoginUserInfo();
        }

        this.navigationEnd.subscribe(evt => {
            this.tryRestoreLoginUserInfo();
            if (evt.url === "/homepage") {
                this.globalService.setBreadCrumbs(new Array<BreadCrumbDto>());
            }
        });

        this.globalService.onBreadCrumbReady.subscribe(breadCrumbs => {
            this.breadCrumbs = breadCrumbs;
        });
    }

    onActivate(event) {
        window.scroll(0, 0);
        //or document.body.scrollTop = 0;
        //or document.querySelector('body').scrollTo(0,0)
    }

    tryRestoreLoginUserInfo(): void {
        this.userInfoService.getCurrentLoginedUserInfo().subscribe(response => {
            UserInfoService.CurrentUser = response;
            this.currentUser = response;
            this.isUserLogined = this.currentUser.isLoginSuccess;
        });
    }

    getMenus(): void {
        this.menuService.getMenus().subscribe(response => {
            this.menus = response;
        });
    }

    trackbyMenuTitle(index: number, menu: MenuDto): string {
        return menu.title;
    }

    /**
     * 退出登录。
     *
     * 重要提示：！
     *     由于 Debug 环境前端跨域，端口与后端并不一致，所以后端无法通过 cookie 方式为前端提供用户认证服务。
     *     在 Debug 环境下，服务端对于用户认证请求和拉去认证信息的鉴权过程中，总是返回 userid=1 的用户信息。
     *     详见 BaseController.cs - ValidateUserIsLogined() 方法。
     *
     *     此特殊处理可能导致前端在开发环境中，永久无法退出用户的登录状态的问题。
     *     但这一问题应当在发布至服务器正式环境后，自动消失。鉴权过程已自动判定 Debug 和 Release 环境，不会为 Release 环境返回未登录的用户信息。
     *
     * */
    logout(): void {
        if (this.currentUser) {
            this.isExiting = true;
            this.userInfoService.logout(this.currentUser.id).then(() => {
                this.currentUser = null;
                this.isUserLogined = false;
                this.isExiting = false;
                this.globalService.successTip("退出登陆成功");
                this.router.navigate(["/homepage"]);
            });
        }
    }

    onSiderCollapsedChange(isCollapsed: boolean): void {
        this.isCollapsed = isCollapsed;
    }

}
