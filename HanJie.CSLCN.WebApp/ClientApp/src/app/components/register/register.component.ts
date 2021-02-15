import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { AsyncValidatorService } from '../../services/async-validator.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;
  timerForNicknameDuplicated!: NodeJS.Timer;
  timerForSmsCodeOK: NodeJS.Timer;
  isSendSmsCodeButtonEnable: boolean = false;

  constructor(private asyncValidatorService: AsyncValidatorService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern("[a-zA-Z0-9]{5,15}")]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      email: [null, [Validators.email, Validators.required]],
      nickname: [null, [Validators.required, Validators.pattern("[\u4e00-\u9fa5]*[a-z]*[A-Z]*\\d*-*_*\\s*"), Validators.maxLength(16)], [this.isSensitiveNickName]],
      phoneNumberPrefix: ['+86', [Validators.required]],
      phoneNumber: ['1888888888', [Validators.required, Validators.pattern(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/)]],
      smsCode: [null, [Validators.required, Validators.pattern(/[0-9]/)], [this.isSmsCodeOK]],
      agree: [false, Validators.required]
    });

    this.validateForm.controls["phoneNumber"].statusChanges.subscribe(valid => {
      if (valid === "VALID") {
        this.isSendSmsCodeButtonEnable = true;
      }
      else {
        this.isSendSmsCodeButtonEnable = false;
      }
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  isSensitiveNickName = (control: FormControl): Observable<any> => { //注意，此处是一个变量，变量的值是 lambda 表达式。而非 isSensitiveNickName(control:FormControl) 方法
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      if (this.timerForNicknameDuplicated !== null) { //请求防抖
        clearTimeout(this.timerForNicknameDuplicated);
      }
      const nickName = control.value;
      this.timerForNicknameDuplicated = setTimeout(() => {
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

  isSmsCodeOK = (control: FormControl): Observable<any> => {  //注意，此处是一个变量，变量的值是 lambda 表达式。而非 isSmsCodeOK(control:FormControl) 方法
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      if (this.timerForSmsCodeOK !== null) {
        clearTimeout(this.timerForSmsCodeOK);
      }
      this.timerForSmsCodeOK = setTimeout(() => { //请求防抖
        const smsCode = control.value;
        this.asyncValidatorService.isSmsCodeOK(this.validateForm.controls["phoneNumber"].value, smsCode).subscribe(response => {
          if (response === true) {
            observer.next({ error: false, smsCodeOK: true });
          }
          else {
            observer.next({ error: true, smsCodeOK: false });
          }
        });
      }, 1000);
    });
  }

  sendSmsCode(): void {
    this.validateForm.controls["phoneNumber"].disable();
    console.log("验证通过，发送手机验证码");
  }


}
