import { Injectable } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { HomepageSettingsDto } from '../models/admin/homepage-settings-dto';
import { SystemSettingTypeEnum } from '../models/enums/system-setting-type-enum';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {

  private systemSettingsUrl = "/api/systemsettings"

  constructor(private httpHelper: CSLHttpHelper) { }

  get<T>(settingType: SystemSettingTypeEnum): Observable<T> {
    return this.httpHelper.get(`${this.systemSettingsUrl}?settingType=${settingType}`);
  }

}
