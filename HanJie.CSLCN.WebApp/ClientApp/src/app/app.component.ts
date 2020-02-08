import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { MenuService } from './services/menu.service';
import { MenuDto } from './models/menu-dto';
import { Observable } from 'rxjs';
import { UserInfoDto } from './models/user-info-dto';
import { UserInfoService } from './services/user-info.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GlobalService } from './services/global.service';
import { responsiveMap } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {

  public isCollapsed: boolean = false;
  public isReverseArrow: boolean = false;
  public width: number = 200;
  public menus: MenuDto[];
  public currentUser: UserInfoDto;
  public isUserLogined: boolean = false;
  public navigationEnd: Observable<NavigationEnd>;

  constructor(private menuService: MenuService,
    private userInfoService: UserInfoService,
    private router: Router,
    public globalService: GlobalService) {
    this.navigationEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit(): void {
    this.getMenus();

    if (this.currentUser == null) {
      this.tryRestoreLoginUserInfo();
    }

    this.navigationEnd.subscribe(evt => {
      this.tryRestoreLoginUserInfo();
    });
  }

  tryRestoreLoginUserInfo(): void {
    this.userInfoService.getCurrentLoginedUserInfo().subscribe(response => {
      this.currentUser = response;
      this.isUserLogined = this.currentUser.isLoginSuccess;
    });
  }

  getMenus(): void {
    this.menuService.getMenus().subscribe(response => {
      this.menus = response;
      console.log(this.menus);
    });
  }

  trackbyMenuTitle(index: number, menu: MenuDto): string {
    return menu.title;
  }

  logout(): void {
    if (this.currentUser) {
      this.userInfoService.logout(this.currentUser.id);
      this.currentUser = null;
      this.isUserLogined = false;
    }
    this.globalService.successTip("退出登陆成功");
    this.router.navigate(["/homepage"]);
  }

}
