import { Injectable } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { SystemSettingsDto } from '../models/admin/system-settings-dto';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {

    private systemSettingsUrl = "/api/systemsettings"

    constructor(private httpHelper:CSLHttpHelper) { }

    get(): Observable<SystemSettingsDto> {
        return this.httpHelper.get(this.systemSettingsUrl);
    }

}
