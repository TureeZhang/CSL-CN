
import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { observable, Observable, Observer } from 'rxjs';
import { FormControl, ValidationErrors } from '@angular/forms';
import { UserInfoService } from './user-info.service';

@Injectable({ providedIn: "root" })
export class ValidateService implements OnInit {

  private uploadUrl: string = "/api/upload";
  private token: string;
  private timers: Map<string, NodeJS.Timer>;

  constructor(private httpHelper: CSLHttpHelper) {
    this.timers = new Map<string, NodeJS.Timer>();
  }

  ngOnInit(): void {

  }

  isContainSensitiveWords = (control: FormControl): Observable<any> => { //注意，此处是一个变量，变量的值是 lambda 表达式。而非 isSensitiveNickName(control:FormControl) 方法
    return this.handleAsyncValidateRequest("/api/asyncvalidator/sensitiveword?testword=", control.value, { error: true, sensitive: true });
  }

  isUserNameExists = (control: FormControl): Observable<any> => {
    return this.handleAsyncValidateRequest("/api/asyncvalidator/UserNameExisted?username=", control.value, { error: true, existed: true });
  }

  isNickNameExists = (control: FormControl): Observable<any> => {
    return this.handleAsyncValidateRequest("/api/asyncvalidator/nicknameexisted?nickname=", control.value, { error: true, existed: true });
  }

  private handleAsyncValidateRequest(url: string, value: string, inErrorObj: object): Observable<any> {
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      let timer: NodeJS.Timer = this.timers.get(url);
      if (timer !== null) { //请求防抖
        clearTimeout(timer);
      }

      if (value === UserInfoService.CurrentUser.nickName) {
        observer.next(null);
        observer.complete();
      }

      timer = setTimeout(() => {
        this.httpHelper.get<boolean>(`${url}${value}`).subscribe(response => {
          if (response === true) {
            observer.next(inErrorObj); //必须返回 error:true 以标识此事件为校验错误
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      }, 1000);

      this.timers.set(url, timer);
    });
  }

  getUploadToken(localFileName: string): Promise<any> {
    localFileName = encodeURI(localFileName);
    let promise: Promise<any> = this.httpHelper.get<any>(this.uploadUrl + "?storageFullName=" + localFileName)
      .toPromise();

    return promise;
  }
}
