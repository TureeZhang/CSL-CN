import { Injectable } from "@angular/core";
import { CSLHttpHelper } from '../../commons/http-helper';
import { UserInfoDto } from '../../models/user-info-dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminUserInfoService {

  private url: string = "/api/admin/adminuserinfo";

  constructor(private cslHttpHelper: CSLHttpHelper) {

  }

  list(onlyUnAudited: boolean): Observable<UserInfoDto[]> {
    let datas: Observable<UserInfoDto[]> = this.cslHttpHelper.get<UserInfoDto[]>(`${this.url}?onlyUnAudited=${onlyUnAudited}`);
    return datas;
  }

}
