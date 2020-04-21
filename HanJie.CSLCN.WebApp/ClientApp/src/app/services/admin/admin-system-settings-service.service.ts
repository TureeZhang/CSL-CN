import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CSLHttpHelper } from '../../commons/http-helper';
import { SystemSettingsDto } from '../../models/admin/system-settings-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminSystemSettingsService {

    private systemSettingsUrl:string = "/api/admin/adminsystemsettings"

    constructor(private httpHelper:CSLHttpHelper) { }

    update(data: SystemSettingsDto): Observable<SystemSettingsDto> {
        return this.httpHelper.post<SystemSettingsDto,SystemSettingsDto>(this.systemSettingsUrl,data);
    }

    get(): Observable<SystemSettingsDto> {
        return this.httpHelper.get<SystemSettingsDto>(this.systemSettingsUrl);
    }

}
