import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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

  constructor(private asyncValidatorService: AsyncValidatorService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      email: [null, [Validators.email, Validators.required]],
      nickname: [null, [Validators.required], [this.isSensitiveNickName]],
      phoneNumber: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      agree: [false]
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

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
  
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
}
