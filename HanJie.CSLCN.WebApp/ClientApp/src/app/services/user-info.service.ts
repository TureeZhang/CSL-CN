import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuDto } from '../models/menu-dto';
import { CSLHttpHelper } from '../commons/http-helper';
import { UserInfoDto } from '../models/user-info-dto';
import { promise } from 'protractor';
import { responsiveMap } from 'ng-zorro-antd';

@Injectable({ providedIn: "root" })
export class UserInfoService {

  private loginApiUrl: string = "/api/login";
  private userInfoApiUrl: string = "/api/userinfo";
  private adminUserInfoApiUrl: string = "/api/admin/adminuserinfo";

  private static currentUser: UserInfoDto;

  constructor(private httpHelper: CSLHttpHelper) {
    if (UserInfoService.currentUser == null) {
      this.getCurrentLoginedUserInfo().subscribe(response => {
        UserInfoService.currentUser = response;
      });
    }
  }

  getUserInfoes(): Observable<UserInfoDto[]> {
    return this.httpHelper.get<UserInfoDto[]>(this.adminUserInfoApiUrl);
  }

  isUserNameDuplicated(userName: string): Observable<boolean> {
    return this.httpHelper.get<boolean>(`${this.adminUserInfoApiUrl}/isduplicated?username=${userName}`);
  }

  login(userInfo: UserInfoDto = null): Observable<UserInfoDto> {
    return this.httpHelper.post<UserInfoDto, UserInfoDto>(this.loginApiUrl, userInfo);
  }

  logout(userId: number): void {
    this.httpHelper.delete(this.loginApiUrl, userId).subscribe(response => {
      UserInfoService.currentUser = null;
    });
  }

  create(data: UserInfoDto): Observable<UserInfoDto> {
    return this.httpHelper.post<UserInfoDto, UserInfoDto>(this.adminUserInfoApiUrl, data);
  }

  getCurrentLoginedUserInfo(): Observable<UserInfoDto> {
    return new Observable<UserInfoDto>((subscriber) => {
      if (UserInfoService.currentUser != null) {
        subscriber.next(UserInfoService.currentUser);
        subscriber.complete();
      } else {
        this.httpHelper.get<UserInfoDto>(this.userInfoApiUrl).subscribe(response => {
          UserInfoService.currentUser = response;
          subscriber.next(response);
          subscriber.complete();
        });
      }
    });

  }

}
