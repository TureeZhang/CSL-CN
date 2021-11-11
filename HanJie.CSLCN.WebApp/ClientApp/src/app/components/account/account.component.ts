import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoDto } from 'src/app/models/user-info-dto';
import { GlobalService } from 'src/app/services/global.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public userinfoForm: FormGroup;
  public isUserInfoLoading: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private globalService: GlobalService,
    public userInfoService: UserInfoService,
    private validateService: ValidateService) {

  }

  ngOnInit(): void {
    this.userinfoForm = this.formBuilder.group({
      nickName: [null, [Validators.required], [this.validateService.isContainSensitiveWords]],
      personalHomepageUrl: [null, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      personalizedSignature: [null]
    });
    this.userInfoService.getCurrentLoginedUserInfo().subscribe(res => {
      this.userinfoForm.patchValue(res);
      this.isUserInfoLoading = false;
    });
  }

  updateUserInfo(): void {
    if (!this.userinfoForm.valid)
      return;

    for (const i in this.userinfoForm.controls) {
      this.userinfoForm.controls[i].markAsDirty();
      this.userinfoForm.controls[i].updateValueAndValidity();
    }

    let data: UserInfoDto = this.userinfoForm.value as UserInfoDto;
    

    this.userInfoService.updateAccount(data).subscribe(res => {
      this.globalService.successTip("提交成功：个人信息将在审核后显示。");
    });

  }

}
