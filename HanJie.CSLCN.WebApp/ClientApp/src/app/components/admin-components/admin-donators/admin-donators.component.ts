import { Component, OnInit } from '@angular/core';
import { DonatorRankDto } from '../../../models/donator-rank-dto';
import { AdminDonatorService } from '../../../services/admin/admin-donator.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { AdminCreateDonatorComponent } from './admin-create-donator.component.ts/admin-create-donator.component';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'admin-donators',
  templateUrl: './admin-donators.component.html',
  styleUrls: ['./admin-donators.component.css']
})
export class AdminDonatorsComponent implements OnInit {

  public datas: DonatorRankDto[];
  public loading: boolean = true;

  constructor(private donatorService: AdminDonatorService,
    private drawerService: NzDrawerService,
    private globalService: GlobalService) {

  }

  ngOnInit(): void {
    this.getDonators();
  }

  getDonators(): void {
    this.donatorService.getDonators().subscribe(response => {
      this.datas = response;
      this.loading = false;
    });
  }

  createDonator(): void {
    const drawerRef = this.drawerService.create<AdminCreateDonatorComponent, {}, DonatorRankDto>({
      nzTitle: '添加捐赠',
      nzContent: AdminCreateDonatorComponent,
      nzPlacement: 'right',
      nzWidth: 320,
      nzContentParams: {

      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (data != null) {
        this.datas = [...this.datas, data];
        this.globalService.successTip(`捐赠信息已更新：${data.userNickName}（￥${data.donateTotalCount}）。`);
      }
    });
  }
}
