import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuDto } from '../models/menu-dto';
import { CSLHttpHelper } from '../commons/http-helper';
import { retry } from 'rxjs/operators';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';
import { UserInfoDto } from '../models/user-info-dto';

@Injectable({ providedIn: "root" })
export class UserInfoService {

  private userServiceUrl: string = "/api/login";

  public static currentUser: UserInfoDto;

  constructor(private httpHelper: CSLHttpHelper) {

  }

  login(userInfo: UserInfoDto = null): Observable<UserInfoDto> {
    return this.httpHelper.post<UserInfoDto, UserInfoDto>(this.userServiceUrl, userInfo);
  }

  logout(userId: number): Observable<object> {
    return this.httpHelper.delete(this.userServiceUrl, userId);
  }
}
