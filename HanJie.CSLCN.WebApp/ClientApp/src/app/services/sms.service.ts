
import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({ providedIn: "root" })
export class SmsService implements OnInit {

  private url: string = "/api/sms";
  private token: string;

  constructor(private httpHelper: CSLHttpHelper) {

  }

  ngOnInit(): void {

  }

  sendSmsValidateCode(phoneNumber: string, validateCode: string): Observable<any> {
    let observable: Observable<any> = this.httpHelper.post<object, any>(this.url, { phoneNumber: phoneNumber, validateCode: validateCode });

    return observable;
  }
}
