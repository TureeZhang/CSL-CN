import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuDto } from '../../models/menu-dto';
import { Observable } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { SystemSettingsService } from '../../services/system-settings.service';
import { WikiPassageDto } from '../../models/wiki-passage-dto';
import { userInfo } from 'os';
import { UserInfoDto } from '../../models/user-info-dto';
import { WikiListItemDto } from '../../models/wiki-list-item-dto';
import { LastModifyWikisService } from '../../services/last-modify-wikis.service';

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    public isLoadingLastModifyWikis: boolean = false;

    public homepageNews: string;
    public lastModifyWikisDisplay: WikiListItemDto[];
    public lastModifyWikis: WikiListItemDto[];
    public pageIndex: number = 1;
    public pageItemTotals: number;

    //自动翻页展示
    public autoPageTimer: NodeJS.Timer;


    constructor(private menuService: MenuService,
        public globalService: GlobalService,
        private lastModifyWikisService: LastModifyWikisService,
        private systemSettingsService: SystemSettingsService) {

    }

    ngOnInit(): void {
        this.systemSettingsService.get().subscribe(response => {
            this.homepageNews = response.homepageNews;
        });

        this.getNewEditWikiPassages();
    }

    getNewEditWikiPassages(): void {
        this.isLoadingLastModifyWikis = true;
        this.lastModifyWikisService.list().subscribe(res => {
            this.lastModifyWikis = res;
            this.pageItemTotals = res.length;
            this.lastModifyWikisDisplay = this.pagination(1, 5, this.lastModifyWikis);
            this.isLoadingLastModifyWikis = false;
        });
        this.startAutoPager();
    }

    startAutoPager(): void {
        this.autoPageTimer = setInterval(() => {
            this.isLoadingLastModifyWikis = true;
            setTimeout(() => {
                let nextPageIndex: number = this.pageIndex + 1;
                if (nextPageIndex > Math.ceil(this.lastModifyWikis.length / 5)) {
                    nextPageIndex = 1;
                }
                this.pageIndex = nextPageIndex;
                this.pageIndexChange(this.pageIndex);
                this.isLoadingLastModifyWikis = false;
            }, 500);

        }, 3000);
    }

    pageIndexChange(index: number) {
        this.pageIndex = index;
        this.lastModifyWikisDisplay = this.pagination(index, 5, this.lastModifyWikis);
        if (this.autoPageTimer != null) {
            console.log("timer stoped");
        }
    }

    stopAutoPageTimer(): void {
        clearTimeout(this.autoPageTimer);
    }

    private pagination(pageNo, pageSize, array): WikiListItemDto[] {
        let offset: number = (pageNo - 1) * pageSize;
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
    }



}
