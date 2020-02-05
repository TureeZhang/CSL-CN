import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuDto } from '../models/menu-dto';
import { CSLHttpHelper } from '../commons/http-helper';
import { UserInfoDto } from '../models/user-info-dto';

@Injectable({ providedIn: "root" })
export class UserInfoService {

  private loginApiUrl: string = "/api/login";
  private adminUserInfoApiUrl: string = "/api/admin/adminuserinfo";

  public static currentUser: UserInfoDto;

  constructor(private httpHelper: CSLHttpHelper) {

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

  logout(userId: number): Observable<object> {
    return this.httpHelper.delete(this.loginApiUrl, userId);
  }

  create(data: UserInfoDto): Observable<UserInfoDto> {
    return this.httpHelper.post<UserInfoDto, UserInfoDto>(this.adminUserInfoApiUrl, data);
  }
}
