import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfoDto } from 'src/app/models/user-info-dto';
import { UserInfoService } from 'src/app/services/user-info.service';
import { AdminHomepageCard } from '../../../models/admin/admin-homepage-card';

@Component({
    selector: 'admin-homepage',
    templateUrl: './admin-homepage.component.html',
    styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

    public data: Array<AdminHomepageCard> = new Array<AdminHomepageCard>();
    public currentUser: UserInfoDto;

    constructor(private userInfoService: UserInfoService,
        private route: Router) {
        this.init();
    }

    private init(): void { }

    ngOnInit(): void {
        this.userInfoService.getCurrentLoginedUserInfo().subscribe(res => {
            this.currentUser = res;

            if (this.currentUser && !this.currentUser.isAdmin)
                this.route.navigate(["/login"]);

        });

        this.data.push(
            new AdminHomepageCard("/admin/audit", "auditTemplate", "审核", "查看并审核内容", "audit"),
            new AdminHomepageCard("/admin/userinfoes", "userinfoAvatarTemplate", "用户", "查看并管理注册用户信息", "user"),
            new AdminHomepageCard("/admin/donators", "donatorRankTemplate", "捐赠", "查看并管理捐赠者统计数据", "heart"),
            new AdminHomepageCard("/admin/wikipassages", "wikiPassageTemplate", "文章", "查看并管理维基文档", "file-text"),
            new AdminHomepageCard("/admin/storagefiles", "cloudFileTemplate", "文件", "查看并管理已上传文件", "cloud-upload"),
            new AdminHomepageCard("/admin/homepagesettings", "homepageSettingsTemplate", "首页设置", "查看并编辑系统关键信息", "desktop"));

    }



}
