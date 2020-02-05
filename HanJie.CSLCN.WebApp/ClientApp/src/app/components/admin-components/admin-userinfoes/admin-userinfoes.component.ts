import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoDto } from '../../../models/user-info-dto';
import { AdminUserInfoService } from '../../../services/admin/admin-userinfo.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { AdminCreateUserInfoComponent } from '../admin-create-userinfo/admin-create-userinfo.component';
import { DrawerStatuService } from '../../../services/drawer-statu.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'admin-userinfoes',
  templateUrl: './admin-userinfoes.component.html',
  styleUrls: ['./admin-userinfoes.component.css']
})
export class AdminUserInfoesComponent implements OnInit {

  public datas: UserInfoDto[];
  public loading: boolean;


  constructor(private adminUserInfoService: AdminUserInfoService,
    private drawerService: NzDrawerService,
    private globalService: GlobalService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.adminUserInfoService.list().subscribe(response => {
      this.datas = response;
      this.loading = false;
    });
  }

  createUser(): void {
    const drawerRef = this.drawerService.create<AdminCreateUserInfoComponent, {}, UserInfoDto>({
      nzTitle: '添加用户',
      nzContent: AdminCreateUserInfoComponent,
      nzPlacement: 'right',
      nzWidth: 320,
      nzContentParams: {

      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      DrawerStatuService.createUserDrawerRef = null;
      console.log(data);

      //注意#
      //按照 Angular 的设计，当需要对 nzData 中的数据进行增删时需要使用以下操作，使用 push 或者 splice 修改 nzData 的数据不会生效

      //// 增加数据
      //this.dataSet = [...this.dataSet, {
      //  key: `${this.i}`,
      //  name: `Edward King ${this.i}`,
      //  age: '32',
      //  address: `London, Park Lane no. ${this.i}`
      //}];
      //// 删除数据
      //this.dataSet = this.dataSet.filter(d => d.key !== i);
      if (data != null) {
        this.datas = [...this.datas, data];
        this.globalService.successTip(`新增用户成功：${data.nickName}(${data.userName})`)
      }
    });

    DrawerStatuService.createUserDrawerRef = drawerRef;
  }

}
