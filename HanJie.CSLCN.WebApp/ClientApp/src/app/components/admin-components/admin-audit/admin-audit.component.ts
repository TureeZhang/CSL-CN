import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { UserInfo } from 'os';
import { Observable } from 'rxjs';
import { UserInfoDto } from 'src/app/models/user-info-dto';
import { AdminUserInfoService } from 'src/app/services/admin/admin-userinfo.service';
import { AuditService } from 'src/app/services/admin/audit.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-audit',
  templateUrl: './admin-audit.component.html',
  styleUrls: ['./admin-audit.component.css']
})
export class AdminAuditComponent implements OnInit {

  public users: UserInfoDto[];
  public comments: Observable<any[]>;
  public wikiPassages: Observable<any[]>;
  public rejectReason: string;
  public selectedUser: UserInfoDto;

  public isUsersLoading: boolean = true;
  public isReasonModalShow: boolean = false;

  constructor(private adminUserInfoService: AdminUserInfoService,
    private globalService: GlobalService,
    private auditService: AuditService) {

  }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    let host = this;

    host.users = [];
    host.isUsersLoading = true;
    this.adminUserInfoService.list(true).subscribe(res => {
      host.users = res;
      host.isUsersLoading = false;
    });
  }

  confirmUser(user: UserInfoDto): void {
    this.auditService.ConfirmUser(user.id).subscribe(res => {
      this.globalService.successTip(`成功：'${user.nickName}' 已通过审核。`)
      this.loadUsers();
    });
  }

  rejectUser(): void {
    if (!this.rejectReason) {
      this.globalService.ErrorTip("请填写原因，以便用户了个人信息审核不通过的原因。");
      return;
    }

    this.auditService.RejectUser(this.selectedUser.id, this.rejectReason).subscribe(res => {
      this.globalService.WarningTip(`成功：已拒绝用户 ${this.selectedUser.nickName} 的个人信息审核。`);
      this.rejectReason = "";
      this.isReasonModalShow = false;
      this.selectedUser = null;
      this.loadUsers();
    });
  }

  showReasonInputModel(user: UserInfoDto): void {
    this.selectedUser = user;
    this.isReasonModalShow = true;
  }


}
