import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuditStatusEnum } from 'src/app/models/enums/audit-status-enum';
import { UserInfoAuditDto } from 'src/app/models/user-info-audit-dto';
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

  public currentUser: UserInfoDto;
  public auditingUser: UserInfoAuditDto;
  public userinfoForm: FormGroup;
  public isUserInfoLoading: boolean = true;
  public isAuditingInfoExist: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private globalService: GlobalService,
    public userInfoService: UserInfoService,
    private validateService: ValidateService) {

  }

  ngOnInit() {
    this.userinfoForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      nickName: [null, [Validators.required], [this.validateService.isContainSensitiveWords, this.validateService.isNickNameExists]],
      personalHomepageUrl: [null, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      personalizedSignature: [null]
    });
    this.userInfoService.getCurrentLoginedUserInfo().subscribe(res => {
      this.currentUser = res;
      this.userinfoForm.patchValue(res);
      this.isUserInfoLoading = false;

      if (res.auditStatus == AuditStatusEnum.OnAuditing) {
        this.userInfoService.getAuditingInfo().subscribe(res => {
          this.auditingUser = res;
          this.isAuditingInfoExist = true;
        });
      }

    });
  }

  updateUserInfo(): void {
    if (!this.userinfoForm.valid)
      return;

    for (const i in this.userinfoForm.controls) {
      this.userinfoForm.controls[i].markAsDirty();
      this.userinfoForm.controls[i].updateValueAndValidity();
    }

    this.userInfoService.updateAccount(this.userinfoForm.value as UserInfoDto).subscribe(res => {
      this.globalService.successTip("提交成功：个人信息将在审核后显示。");
    });

  }

}
