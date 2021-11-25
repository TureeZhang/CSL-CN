import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { UserInfo } from 'os';
import { Observable } from 'rxjs';
import { UserInfoAuditDto } from 'src/app/models/user-info-audit-dto';
import { UserInfoDto } from 'src/app/models/user-info-dto';
import { WikiPassageCommentDto } from 'src/app/models/wiki-passage-comment-dto';
import { AdminUserInfoService } from 'src/app/services/admin/admin-userinfo.service';
import { AuditService } from 'src/app/services/admin/audit.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-audit',
  templateUrl: './admin-audit.component.html',
  styleUrls: ['./admin-audit.component.css']
})
export class AdminAuditComponent implements OnInit {

  private auditRejectReasonTip: string = "请填写原因，以便用户了个人信息审核不通过的原因。";

  public users: UserInfoAuditDto[];
  public comments: WikiPassageCommentDto[];
  public wikiPassages: any[];
  public rejectReason: string;
  public selectedUser: UserInfoAuditDto;
  public selectedComment: WikiPassageCommentDto;

  public isUsersLoading: boolean = true;
  public isCommentsLoading: boolean = true;
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
    this.adminUserInfoService.listUnAuditUserInfoes().subscribe(res => {
      host.users = res;
      host.isUsersLoading = false;
    });
  }

  confirmUser(user: UserInfoAuditDto): void {
    this.auditService.ConfirmUser(user.userId).subscribe(res => {
      this.globalService.successTip(`成功：'${user.nickName}' 已通过审核。`)
      this.loadUsers();
    });
  }

  rejectUser(): void {
    if (!this.rejectReason) {
      this.globalService.ErrorTip(this.auditRejectReasonTip);
      return;
    }

    this.auditService.RejectUser(this.selectedUser.userId, this.rejectReason).subscribe(res => {
      this.globalService.WarningTip(`成功：已拒绝用户 ${this.selectedUser.nickName} 的个人信息审核。`);
      this.rejectReason = "";
      this.isReasonModalShow = false;
      this.selectedUser = null;
      this.loadUsers();
    });
  }

  listOnAuditingWikiComments(): void {
    this.isCommentsLoading = true;
    this.comments=[];
    let host = this;
    this.auditService.listOnAuditingWikiComment().subscribe(res => {
      host.comments = res;
      host.isCommentsLoading = false;
    });
  }

  confirmComment(commentId: number) {
    this.auditService.ConfirmWikiComment(commentId).subscribe(res => {
      this.globalService.successTip(`成功：评论已审核通过。`);

      this.listOnAuditingWikiComments();
    });
  }

  rejectComment() {
    if (!this.rejectReason) {
      this.globalService.ErrorTip(this.auditRejectReasonTip);
      return;
    }

    this.auditService.RejectWikiComment(this.selectedComment.id, this.rejectReason).subscribe(res => {
      this.globalService.successTip(`评论审核已拒绝，用户将会收到原因说明。`);
      this.rejectReason = "";

      this.listOnAuditingWikiComments();
    });
  }

  showReasonInputModel(selectItem: UserInfoAuditDto | WikiPassageCommentDto, selectTyle: 'user' | 'comment'): void {

    if (selectTyle == 'user') {
      this.selectedUser = selectItem as UserInfoAuditDto;
    }

    if (selectTyle == 'comment') {
      this.selectedComment = selectItem as WikiPassageCommentDto;
    }

    this.isReasonModalShow = true;
  }

  nzRejectReasonInputModelCofirm(): void {
    if (this.selectedUser) {
      this.rejectUser();
    }

    if (this.selectedComment) {
      this.rejectComment();
    }

    this.closeClearSelectItem();

  }

  closeClearSelectItem(): void {
    this.selectedUser = null;
    this.selectedComment = null;

    this.isReasonModalShow = false;
  }


}
