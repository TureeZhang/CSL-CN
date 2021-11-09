import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoDto } from 'src/app/models/user-info-dto';
import { AdminUserInfoService } from 'src/app/services/admin/admin-userinfo.service';

@Component({
  selector: 'app-admin-audit',
  templateUrl: './admin-audit.component.html',
  styleUrls: ['./admin-audit.component.css']
})
export class AdminAuditComponent implements OnInit {

  public users: UserInfoDto[];
  public comments: Observable<any[]>;
  public wikiPassages: Observable<any[]>;

  public isUsersLoading: boolean = true;

  constructor(private adminUserInfoService: AdminUserInfoService) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    let host = this;
    this.adminUserInfoService.list(true).subscribe(res => {
      host.users = res;
      host.isUsersLoading = false;
    });
  }

}
