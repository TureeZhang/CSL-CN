import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { MenuService } from './services/menu.service';
import { MenuDto } from './models/menu-dto';
import { Observable } from 'rxjs';
import { UserInfoDto } from './models/user-info-dto';
import { UserInfoService } from './services/user-info.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GlobalService } from './services/global.service';

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

    this.navigationEnd.subscribe(evt => {
      if (UserInfoService.currentUser) {
        this.currentUser = UserInfoService.currentUser;
        this.isUserLogined = UserInfoService.currentUser.isLoginSuccess;
      }
    });

    if (UserInfoService.currentUser == null) {
      this.tryRestoreLoginStatus();
    }
  }

  ngAfterContentChecked(): void {
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

  tryRestoreLoginStatus(): void {
    if (this.currentUser == null) {
      this.userInfoService.login().subscribe(user => {
        UserInfoService.currentUser = user;
        this.currentUser = UserInfoService.currentUser;
        this.isUserLogined = UserInfoService.currentUser.isLoginSuccess;
      });
    }
  }

  logout(): void {
    let host = this;
    if (this.currentUser) {
      this.userInfoService.logout(this.currentUser.id).subscribe((res) => {
        UserInfoService.currentUser = null;
        this.currentUser = UserInfoService.currentUser;
        this.isUserLogined = false;
        host.router.navigate(["/homepage"])
      });
    }
  }
}
