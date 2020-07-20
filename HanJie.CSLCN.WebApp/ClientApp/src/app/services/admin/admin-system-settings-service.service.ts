import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CSLHttpHelper } from '../../commons/http-helper';
import { HomepageSettingsDto } from '../../models/admin/homepage-settings-dto';
import { SystemSettingTypeEnum } from '../../models/enums/system-setting-type-enum';

@Injectable({
  providedIn: 'root'
})
export class AdminSystemSettingsService {

  private systemSettingsUrl: string = "/api/admin/adminsystemsettings"

  constructor(private httpHelper: CSLHttpHelper) { }

  update(data: HomepageSettingsDto): Observable<HomepageSettingsDto> {
    return this.httpHelper.post<HomepageSettingsDto, HomepageSettingsDto>(this.systemSettingsUrl, data);
  }

  get<T>(settingType: SystemSettingTypeEnum): Observable<T> {
    return this.httpHelper.get<T>(`${this.systemSettingsUrl}?settingType=${settingType}`);
  }

}
