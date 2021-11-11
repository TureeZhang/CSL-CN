
import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable, Observer } from 'rxjs';
import { FormControl, ValidationErrors } from '@angular/forms';
import { AsyncValidatorService } from './async-validator.service';

@Injectable({ providedIn: "root" })
export class ValidateService implements OnInit {

  private uploadUrl: string = "/api/upload";
  private token: string;
  private timerForSensitiveContentValidate: NodeJS.Timer;

  constructor(private httpHelper: CSLHttpHelper,
    private asyncValidatorService: AsyncValidatorService) {

  }

  ngOnInit(): void {

  }

  isContainSensitiveWords = (control: FormControl): Observable<any> => { //注意，此处是一个变量，变量的值是 lambda 表达式。而非 isSensitiveNickName(control:FormControl) 方法
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      if (this.timerForSensitiveContentValidate !== null) { //请求防抖
        clearTimeout(this.timerForSensitiveContentValidate);
      }
      const nickName = control.value;
      this.timerForSensitiveContentValidate = setTimeout(() => {
        this.asyncValidatorService.isContainSensitiveWord(nickName).subscribe(response => {
          if (response === true) {
            observer.next({ error: true, sensitive: true }); //必须返回 error:true 以标识此事件为校验错误
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      }, 1000);
    });
  }

  getUploadToken(localFileName: string): Promise<any> {
    localFileName = encodeURI(localFileName);
    let promise: Promise<any> = this.httpHelper.get<any>(this.uploadUrl + "?storageFullName=" + localFileName)
      .toPromise();

    return promise;
  }
}
