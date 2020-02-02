import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoDto } from '../../../models/user-info-dto';
import { AdminUserInfoService } from '../../../services/admin/admin-userinfo.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { AdminCreateUserInfoComponent } from '../admin-create-userinfo/admin-create-userinfo.component';
import { DrawerStatuService } from '../../../services/drawer-statu.service';

@Component({
  selector: 'admin-userinfoes',
  templateUrl: './admin-userinfoes.component.html',
  styleUrls: ['./admin-userinfoes.component.css']
})
export class AdminUserInfoesComponent implements OnInit {

  public datas: UserInfoDto[];
  public loading: boolean;


  constructor(private adminUserInfoService: AdminUserInfoService,
    private drawerService: NzDrawerService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.adminUserInfoService.list().subscribe(response => {
      this.datas = response;
      this.loading = false;
    });
  }

  createUser(): void {
    const drawerRef = this.drawerService.create<AdminCreateUserInfoComponent, {}, string>({
      nzTitle: '添加用户',
      nzContent: AdminCreateUserInfoComponent,
      nzPlacement: 'right',
      nzWidth: 320,
      nzMaskClosable: false,
      nzContentParams: {

      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      DrawerStatuService.createUserDrawerRef = null;
      console.log(data);
      if (typeof data === 'string') {
        console.log(data.toString());
        //this.value = data;
      }
    });

    DrawerStatuService.createUserDrawerRef = drawerRef;
  }

}
