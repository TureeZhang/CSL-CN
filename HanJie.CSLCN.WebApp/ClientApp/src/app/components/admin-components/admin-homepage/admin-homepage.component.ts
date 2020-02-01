import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminHomepageCard } from '../../../models/admin/admin-homepage-card';

@Component({
  selector: 'admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  public data: Array<AdminHomepageCard> = new Array<AdminHomepageCard>();

  constructor() {
    this.init();
  }

  private init(): void {
    this.data.push(
      new AdminHomepageCard("/admin/userinfoes", "userinfoAvatarTemplate", "用户", "查看并管理注册用户信息", "user"),
      new AdminHomepageCard("/admin/donatorranks", "donatorRankTemplate", "捐赠", "查看并管理捐赠者统计数据", "heart"),
      new AdminHomepageCard("/admin/wikipassages", "wikiPassageTemplate", "文章", "查看并管理维基文档", "file-text"),
      new AdminHomepageCard("/admin/storagefiles", "cloudFileTemplate", "文件", "查看并管理已上传文件", "cloud-upload"));
  }

  ngOnInit(): void {

  }



}
