import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuDto } from '../models/menu-dto';
import { CSLHttpHelper } from '../commons/http-helper';
import { UserInfoDto } from '../models/user-info-dto';
import { promise } from 'protractor';
import { resolve } from 'url';
import { reject } from 'q';
import { CookieService } from './cookie.service';
import { StringTagConsts } from '../models/consts/string-tag-consts';

@Injectable({ providedIn: "root" })
export class UserInfoService {

    private loginApiUrl: string = "/api/login";
    private userInfoApiUrl: string = "/api/userinfo";
    private adminUserInfoApiUrl: string = "/api/admin/adminuserinfo";

    public static CurrentUser: UserInfoDto;

    constructor(private httpHelper: CSLHttpHelper,
        private cookieService: CookieService) {
        if (UserInfoService.CurrentUser == null) {
            this.getCurrentLoginedUserInfo().subscribe(response => {
                UserInfoService.CurrentUser = response;
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

    logout(userId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.httpHelper.delete(this.loginApiUrl, userId).subscribe(response => {
                UserInfoService.CurrentUser = null;
                this.cookieService.deleteCookie(StringTagConsts.currentLoginedUserGuid);
                resolve();
            });
        });
    }

    create(data: UserInfoDto): Observable<UserInfoDto> {
        return this.httpHelper.post<UserInfoDto, UserInfoDto>(this.adminUserInfoApiUrl, data);
    }

    getCurrentLoginedUserInfo(): Observable<UserInfoDto> {
        return new Observable<UserInfoDto>((subscriber) => {
            if (UserInfoService.CurrentUser != null) {
                subscriber.next(UserInfoService.CurrentUser);
                subscriber.complete();
            } else {
                this.httpHelper.get<UserInfoDto>(this.userInfoApiUrl).subscribe(response => {
                    UserInfoService.CurrentUser = response;
                    subscriber.next(response);
                    subscriber.complete();
                });
            }
        });

    }

}
