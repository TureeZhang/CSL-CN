import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CSLHttpHelper } from 'src/app/commons/http-helper';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private httpHelper: CSLHttpHelper) {

  }

  public ConfirmUser(userId: number): Observable<any> {
    return this.httpHelper.get<void>(`/api/audit/confirmuser?userid=${userId}`);
  }

  public RejectUser(userId: number, reason: string): Observable<any> {
    return this.httpHelper.get<void>(`/api/audit/rejectuser?userid=${userId}&reason=${reason}`);
  }



}
