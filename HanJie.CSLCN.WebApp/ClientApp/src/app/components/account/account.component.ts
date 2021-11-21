import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { AuditStatusEnum } from 'src/app/models/enums/audit-status-enum';
import { UploaderUsageEnum } from 'src/app/models/uploader-usage.enum';
import { UserInfoAuditDto } from 'src/app/models/user-info-audit-dto';
import { UserInfoDto } from 'src/app/models/user-info-dto';
import { GlobalService } from 'src/app/services/global.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ValidateService } from 'src/app/services/validate.service';
import { UploaderComponent } from '../uploader/uploader.component';
import { v4 as v4uuid } from 'uuid';

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
  public isAvatarUpdate: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private globalService: GlobalService,
    public userInfoService: UserInfoService,
    private validateService: ValidateService,
    private drawerService: NzDrawerService) {

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

    let submitData: UserInfoDto = this.userinfoForm.value as UserInfoDto;
    submitData.avatarUrl = this.currentUser.avatarUrl;
    this.userInfoService.updateAccount(submitData).subscribe(res => {
      this.globalService.successTip("提交成功：个人信息将在审核后显示。");
      this.currentUser.auditStatus = AuditStatusEnum.OnAuditing;
      this.auditingUser = new UserInfoAuditDto();
      this.auditingUser.nickName = this.userinfoForm.value.nickName;
      this.auditingUser.personalHomepageUrl = this.userinfoForm.value.personalHomepageUrl;
      this.auditingUser.personalizedSignature = this.userinfoForm.value.personalizedSignature;
      this.auditingUser.auditRejectedReason = null;
      this.auditingUser.avatarUrl = this.currentUser.avatarUrl;
    });

  }

  openUploader(): void {
    const drawerRef = this.drawerService.create<UploaderComponent, { directoryPath: string, usage: UploaderUsageEnum, storageFileName: string, sizeLimit: number, fileTypes: string }, string>({
      nzTitle: '上传图片',
      nzContent: UploaderComponent,
      nzPlacement: 'right',
      nzContentParams: {
        directoryPath: `user-avatar`,
        usage: UploaderUsageEnum.userAvatar,
        storageFileName: `user${this.currentUser.id}` + "_new",
        sizeLimit: 500,
        fileTypes: "image/png,image/jpeg,image/bmp"
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);

      if (typeof data === 'string' && data) {
        this.currentUser.avatarUrl = data;
        console.log(data.toString());
        //this.value = data;
      }
    });
  }

}
