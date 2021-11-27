import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo, userInfo } from 'os';
import { observable, Observable, Observer } from 'rxjs';
import { CSLHttpHelper } from 'src/app/commons/http-helper';
import { UserInfoDto } from 'src/app/models/user-info-dto';
import { GlobalService } from 'src/app/services/global.service';
import { SmsService } from 'src/app/services/sms.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ValidateService } from 'src/app/services/validate.service';
import { ValidateCodeModalComponent } from '../validate-code-modal/validate-code-modal.component';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;
  timerForUserNameExisted!: NodeJS.Timer;
  timerForSmsCodeOK: NodeJS.Timer;
  isValidateCodeModalShow: boolean = false;
  isSendSmsCodeButtonEnable: boolean = false;
  isAgreementShow: boolean = false;

  @ViewChild(ValidateCodeModalComponent, { static: true })
  validateCodelModalComponent: ValidateCodeModalComponent;

  constructor(private globalService: GlobalService,
    private smsService: SmsService,
    private userInfoService: UserInfoService,
    private route: Router,
    private fb: FormBuilder,
    private validateService: ValidateService,
    private httpHelper: CSLHttpHelper) {

  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern("[a-zA-Z0-9]{5,15}")], [this.validateService.isUserNameExists]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required, Validators.pattern("[\u4e00-\u9fa5]*[a-z]*[A-Z]*\\d*-*_*\\s*"), Validators.maxLength(16)], [this.validateService.isContainSensitiveWords, this.validateService.isNickNameExists]],
      phoneNumberPrefix: ['+86', [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/)], [this.validateService.isPhoneNumberExists]],
      smsCode: [null, [Validators.required, Validators.maxLength(6)], Validators.pattern(/[0-9]/)],
      agree: [true, [Validators.required]]
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
    let user: UserInfoDto = this.validateForm.value as UserInfoDto;
    this.userInfoService.register(user, this.validateForm.controls["smsCode"].value as string).subscribe(res => {
      this.globalService.successTip(`注册成功：欢迎 ${user.userName} ！`);
      this.route.navigate(['/login']);
    });
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

  sendSmsCode(userInputCode: string): void {
    var phoneNumberInput = this.validateForm.controls["phoneNumber"];
    phoneNumberInput.disable();

    this.smsService.sendSmsValidateCode(this.validateForm.controls["phoneNumberPrefix"].value + phoneNumberInput.value, userInputCode).subscribe(data => {
      this.isValidateCodeModalShow = false;
      this.validateCodelModalComponent.refreshValidateCode();
      this.globalService.successTip(`验证通过：已向手机 ${phoneNumberInput.value} 发送验证码。`);
    },
      err => {
        this.validateCodelModalComponent.refreshValidateCode();
      });
  }

  showAgreement(): void {
    this.isAgreementShow = true;
  }

  closeAgreement(): void {
    this.isAgreementShow = false;
  }


}
