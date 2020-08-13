import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomepageSettingsDto } from '../../../models/admin/homepage-settings-dto';
import { removeSummaryDuplicates } from '@angular/compiler';
import { AdminSystemSettingsService } from '../../../services/admin/admin-system-settings-service.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { HomepageColorSettingsDto } from '../../../models/admin/homepage-color-settings-dto';
import { HomepageBoardTitleDto } from '../../../models/admin/homepage-board-title-dto';
import { HomepageSiteInfoDto } from '../../../models/admin/homepage-site-info-dto';
import { HomepageBoardContentDto } from '../../../models/admin/homepage-board-content-dto';
import { SystemSettingTypeEnum } from '../../../models/enums/system-setting-type-enum';

@Component({
    selector: 'admin-homepage-settings',
    templateUrl: './admin-homepage-settings.component.html',
    styleUrls: ['./admin-homepage-settings.component.css']
})
export class AdminHomepageSettingsComponent implements OnInit {

    public systemSettingsForm: FormGroup;
    public colorSettings: HomepageColorSettingsDto[];
    public boardTitles: any[];
    public siteInfoes: HomepageSiteInfoDto[];
    public boardContents: HomepageBoardContentDto[];
    public homepageSettings: HomepageSettingsDto;
    public oldHomepageSettings: HomepageSettingsDto;

    constructor(private adminSystemSettingsService: AdminSystemSettingsService,
        private formBuilder: FormBuilder,
        private router: Router,
        private globalService: GlobalService) {

        this.systemSettingsForm = this.formBuilder.group({

            websiteName: ['', [Validators.required]],
            websiteDescription: ['', [Validators.required]],
            websiteRecordNumber: ['', [Validators.required]],
            mainLogoPath: ['', [Validators.required]],
            homepageLogoPath: ['', [Validators.required]],

            boardTitleA: ['', [Validators.required]],
            boardTitleB: ['', [Validators.required]],
            boardTitleC: ['', [Validators.required]],
            boardTitleD: ['', [Validators.required]],
            boardTitleE: ['', [Validators.required]],
            boardTitleF: ['', [Validators.required]],

            boardContentB: ['', [Validators.required]],
            boardContentC: ['', [Validators.required]],
            boardContentD: ['', [Validators.required]],

            menuBackgroundColor: ['#001529', [Validators.required]],
            menuGroupitemBackgroundColor: ['#000c17', [Validators.required]],

            menuTextFocusColor: ['', [Validators.required]],
            menuBackgroundFocusColor: ['#1890ff', [Validators.required]],

            menuTextColor: ['', [Validators.required]],
            menuGroupTextColor: ['', [Validators.required]],
            menuHoverColor: ['', [Validators.required]],
            menuHoverBackgroundColor: ['', [Validators.required]],

            headerBoardBackgroundColor: ['', [Validators.required]],
            headerBoardTextColor: ['', [Validators.required]],
            littleBoardTitleTextColor: ['', [Validators.required]],
            littleBoardBackgroundColor: ['', [Validators.required]],

            friendlyWebsiteUrls: ['', [Validators.required]],
            outsideMediaLinkText: ['', [Validators.required]],
            outsideMediaLinkUrl: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.ngForElements();
        this.initHomepageSettingValues();
    }

    ngForElements(): void {

        this.homepageSettings = new HomepageSettingsDto();

        this.siteInfoes = [
            new HomepageSiteInfoDto("网站名称", "websiteName", "汉界的一颗小虎牙", "websiteName"),
            new HomepageSiteInfoDto("网站简介", "websiteDescription", "汉界的一颗小虎牙，你可以免费查阅的 城市天际线 在线百科全书。", "websiteDescription"),
            new HomepageSiteInfoDto("备案编号", "websiteRecordNumber", "浙ICP备19051457号-1", "websiteRecordNumber"),
            new HomepageSiteInfoDto("Logo 路径（放在 /wwwroot 文件夹下）", "mainLogoPath", "/assets/logo.png", "mainLogoPath"),
            new HomepageSiteInfoDto("主页顶部 Logo 路径（放在 /wwwroot 文件夹下）", "homepageLogoPath", "/assets/logo-header.png", "homepageLogoPath")
        ];

        this.boardContents = [
            new HomepageBoardContentDto("B 版块内容", "boardContentB", "B 版块显示的文本内容", "boardContentB"),
            new HomepageBoardContentDto("C 版块内容", "boardContentC", "C 版块显示的文本内容", "boardContentC"),
            new HomepageBoardContentDto("D 版块内容", "boardContentD", "D 版块显示的文本内容", "boardContentD")
        ];

        this.boardTitles = [
            new HomepageBoardTitleDto("A 版块标题", "boardTitleA", "A 版块标题名称", "boardTitleA"),
            new HomepageBoardTitleDto("B 版块标题", "boardTitleB", "B 版块标题名称", "boardTitleB"),
            new HomepageBoardTitleDto("C 版块标题", "boardTitleC", "C 版块标题名称", "boardTitleC"),
            new HomepageBoardTitleDto("D 版块标题", "boardTitleD", "D 版块标题名称", "boardTitleD"),
            new HomepageBoardTitleDto("E 版块标题", "boardTitleE", "E 版块标题名称", "boardTitleE"),
            new HomepageBoardTitleDto("F 版块标题", "boardTitleF", "F 版块标题名称", "boardTitleF")
        ];

        this.colorSettings = [
            //菜单背景色
            new HomepageColorSettingsDto("菜单分组背景色", "menuBackgroundColor", "菜单分组背景色", "menuBackgroundColor"),
            new HomepageColorSettingsDto("二级菜单背景色", "menuGroupitemBackgroundColor", "二级菜单背景色", "menuGroupitemBackgroundColor"),
            new HomepageColorSettingsDto("菜单选中文字色", "menuTextFocusColor", "选中菜单文字色", "menuTextFocusColor"),
            new HomepageColorSettingsDto("菜单选中背景色", "menuBackgroundFocusColor", "选中菜单背景色", "menuBackgroundFocusColor"),
            //菜单文字色
            new HomepageColorSettingsDto("菜单文字色", "menuTextColor", "菜单文字色", "menuTextColor"),
            new HomepageColorSettingsDto("菜单分组文字色", "menuGroupTextColor", "菜单分组文字色", "menuGroupTextColor"),
            new HomepageColorSettingsDto("菜单悬停文字色", "menuHoverColor", "菜单悬停文字色", "menuHoverColor"),
            new HomepageColorSettingsDto("菜单悬停背景色", "menuHoverBackgroundColor", "菜单悬停背景色", "menuHoverBackgroundColor"),
            //主页版块色
            new HomepageColorSettingsDto("大版块背景色", "headerBoardBackgroundColor", "大版块背景色", "headerBoardBackgroundColor"),
            new HomepageColorSettingsDto("大版块文字色", "headerBoardTextColor", "大版块文字色", "headerBoardTextColor"),
            new HomepageColorSettingsDto("小版块文字色", "littleBoardTitleTextColor", "小版块文字色", "littleBoardTitleTextColor"),
            new HomepageColorSettingsDto("小版块背景色", "littleBoardBackgroundColor", "小版块背景色", "littleBoardBackgroundColor")
        ];
    }

    initHomepageSettingValues(): void {
        this.adminSystemSettingsService.get<HomepageSettingsDto>(SystemSettingTypeEnum.HomePage).subscribe(response => {
            this.homepageSettings = response;
            this.oldHomepageSettings = response;
            this.systemSettingsForm.setValue(this.homepageSettings);
        });
    }

    submitForm(data: HomepageSettingsDto): void {
        for (const item in this.systemSettingsForm.controls) {
            this.systemSettingsForm.controls[item].markAsDirty();
            this.systemSettingsForm.controls[item].updateValueAndValidity();
        }

        this.adminSystemSettingsService.update(data).subscribe(response => {
            this.router.navigate(['/admin']);
            this.globalService.successTip("系统设置保存成功。");
        });

    }

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.systemSettingsForm.reset();
        for (const key in this.systemSettingsForm.controls) {
            this.systemSettingsForm.controls[key].markAsPristine();
            this.systemSettingsForm.controls[key].updateValueAndValidity();
        }

        this.systemSettingsForm.patchValue(this.oldHomepageSettings);
    }

    resetColorSettings(): void {
        this.systemSettingsForm.patchValue({
            menuBackgroundColor: "#001529",
            menuGroupitemBackgroundColor: "#000c17",
            menuTextFocusColor: "#fff",
            menuBackgroundFocusColor: "#1890ff",
            menuTextColor: "hsla(0,0%,100%,.65)",
            menuGroupTextColor: "hsla(0,0%,100%,.65)",
            menuHoverColor: "#fff",
            menuHoverBackgroundColor: "transparent",
            headerBoardTextColor: "white",
            headerBoardBackgroundColor: "#001529",
            littleBoardTitleTextColor: "#fff",
            littleBoardBackgroundColor: "#789"
        });
        this.globalService.successTip("已重置\"主题色\"全部数值。（点击保存后生效）")
    }
}
