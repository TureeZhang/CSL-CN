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
import { SystemSettingTypeEnum } from '../../models/enums/system-setting-type-enum';
import { HomepageSettingsDto } from '../../models/admin/homepage-settings-dto';
import { WikiPassageService } from '../../services/wiki-passage.service';
import { WikiListService } from '../../services/wiki-list.service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    public isLoadingLastModifyWikis: boolean = false;
    public isLoadingBoardContent: boolean = true;

    public homepageSettings: HomepageSettingsDto;
    public lastModifyWikisDisplay: WikiListItemDto[];
    public lastModifyWikis: WikiListItemDto[];
    public pageIndex: number = 1;
    public pageItemTotals: number;
    public friendlyLinks: any[];
    public modCategoryWikis: WikiListItemDto[];
    //public colors: string[] = ["#00ff72", "#fff700", "#00d0ff", "#ff0047", "#00fff3", "#ffffff", "#ef00ff", "#00ff72", "#fff700", "#00d0ff", "#ff0047", "#00fff3", "#ef00ff", "#00ff72", "#fff700", "#00d0ff", "#ff0047", "#00fff3", "#ef00ff", "#00ff72", "#fff700", "#00d0ff", "#ff0047", "#00fff3", "#ef00ff", "#00ff72", "#fff700", "#00d0ff", "#ff0047", "#00fff3", "#ef00ff", "#00ff72", "#fff700", "#00d0ff", "#ff0047", "#00fff3", "#ffffff", "#ef00ff"];
    public isLoadingModPassage: boolean = true;
    public currentUser: UserInfoDto;
    public isAdmin: boolean = false;

    //自动翻页展示
    public autoPageTimer: NodeJS.Timer;


    constructor(private menuService: MenuService,
        public globalService: GlobalService,
        private lastModifyWikisService: LastModifyWikisService,
        private systemSettingsService: SystemSettingsService,
        private wikiListService: WikiListService,
        private userInfoService: UserInfoService) {

    }

    ngOnInit(): void {

        this.systemSettingsService.get<HomepageSettingsDto>(SystemSettingTypeEnum.HomePage).subscribe(response => {
            this.homepageSettings = response;
            document.body.style.cssText += `--header-board-text-color: ${this.homepageSettings.headerBoardTextColor}`;
            document.body.style.cssText += `--header-board-background-color: ${this.homepageSettings.headerBoardBackgroundColor}`;
            document.body.style.cssText += `--little-board-title-text-color: ${this.homepageSettings.littleBoardTitleTextColor}`;
            document.body.style.cssText += `--little-board-background-color: ${this.homepageSettings.littleBoardBackgroundColor}`;
            this.loadDlcInfoes();
        });
        this.isLoadingBoardContent = false;

        this.getNewEditWikiPassages();
        this.listCategoryPassages(3);//Mod推荐

        //检查是否为管理员
        this.userInfoService.getCurrentLoginedUserInfo().subscribe(response => {
            this.currentUser = response;
            this.isAdmin = response.isAdmin;
        });
    }

    loadDlcInfoes(): void {

        let myLinks = [];
        for (const line of this.homepageSettings.friendlyWebsiteUrls.split(/[\r\n]+/)) {
            let item: string[] = line.split("|");
            let linker: object = { name: item[0], icon: item[1], url: item[2] };
            myLinks.push(linker);
        }

        this.friendlyLinks = myLinks;
        //this.dlcInfoes = [
        //    { icon: "/assets/dlc-logo/after-dark.png", url: "/wiki-passage/downloadable-content", name: "黑夜（After Dark）" },
        //    { icon: "/assets/dlc-logo/snowfall.png", url: "/wiki-passage/downloadable-content", name: "降雪（Snowfall）" },
        //    { icon: "/assets/dlc-logo/natural-disasters.png", url: "/wiki-passage/downloadable-content", name: "灾害（Natural Disasters）" },
        //    { icon: "/assets/dlc-logo/mass-transit.png", url: "/wiki-passage/downloadable-content", name: "交通运输（Mass Transit）" },
        //    { icon: "/assets/dlc-logo/green-city.png", url: "/wiki-passage/downloadable-content", name: "绿色城市（Green Cities）" },
        //    { icon: "/assets/dlc-logo/parklife.png", url: "/wiki-passage/downloadable-content", name: "公园生活（Parklife）" },
        //    { icon: "/assets/dlc-logo/industries.png", url: "/wiki-passage/downloadable-content", name: "工业（Industries）" },
        //    { icon: "/assets/dlc-logo/campus.png", url: "/wiki-passage/downloadable-content", name: "校园（Campus）" },
        //    { icon: "/assets/dlc-logo/sunset-harbor.png", url: "/wiki-passage/downloadable-content", name: "日落港口（Sunset Harbor）" },
        //    { icon: "", url: "", name: "" },
        //    { icon: "", url: "", name: "" },
        //    { icon: "", url: "", name: "" }
        //];
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

        }, 5000);
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

    listCategoryPassages(categoryId: number): void {
        this.wikiListService.listCategoryPassages(categoryId).subscribe((response) => {
            this.modCategoryWikis = response;
            this.isLoadingModPassage = false;
        }, () => { this.isLoadingModPassage = false; })
    }

}
