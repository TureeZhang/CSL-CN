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

  constructor(private adminSystemSettingsService: AdminSystemSettingsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private globalService: GlobalService) {
    
    this.systemSettingsForm = this.formBuilder.group({
      menuBackgroundColor: ['', [Validators.required]],
      menuSecondaryBackgroundColor: ['', [Validators.required]],
      menuBackgroundFocusColor: ['', [Validators.required]],
      menuTextColor: ['', [Validators.required]],
      menuTextFocusColor: ['', [Validators.required]],
      boardBackgroundColor: ['', [Validators.required]],
      boardTextColor: ['', [Validators.required]],
      boardTitleA: ['', [Validators.required]],
      boardTitleB: ['', [Validators.required]],
      boardTitleC: ['', [Validators.required]],
      boardTitleD: ['', [Validators.required]],
      boardTitleE: ['', [Validators.required]],
      boardTitleF: ['', [Validators.required]],
      boardContentB: ['', [Validators.required]],
      boardContentC: ['', [Validators.required]],
      boardContentD: ['', [Validators.required]],
      websiteName: ['', [Validators.required]],
      websiteDescription: ['', [Validators.required]],
      websiteRecordNumber: ['', [Validators.required]],
      friendlyWebsiteUrls: ['', [Validators.required]],
      isDisplayHuyaLiveUrl: [true, [Validators.required]]
    });
  }

  ngOnInit() {
    this.ngForElements();
    this.initHomepageSettingValues();
  }

  ngForElements(): void {

    this.homepageSettings = new HomepageSettingsDto();

    this.siteInfoes = [
      new HomepageSiteInfoDto("网站名称", "websiteName", "汉界的一颗小虎牙", this.homepageSettings.websiteName),
      new HomepageSiteInfoDto("网站简介", "websiteDescription", "汉界的一颗小虎牙，你可以免费查阅的 城市天际线 在线百科全书。", this.homepageSettings.websiteDescription),
      new HomepageSiteInfoDto("备案编号", "websiteRecordNumber", "浙ICP备19051457号-1", this.homepageSettings.websiteRecordNumber)
    ];

    this.boardContents = [
      new HomepageBoardContentDto("B 版块内容", "boardContentB", "B 版块显示的文本内容", "boardContentB"),
      new HomepageBoardContentDto("C 版块内容", "boardContentC", "C 版块显示的文本内容", "boardContentC"),
      new HomepageBoardContentDto("D 版块内容", "boardContentD", "D 版块显示的文本内容", "boardContentD")
    ];

    this.boardTitles = [
      new HomepageBoardTitleDto("A 版块标题", "boardTitleA", "A 版块标题名称", this.homepageSettings.boardTitleA),
      new HomepageBoardTitleDto("B 版块标题", "boardTitleB", "B 版块标题名称", this.homepageSettings.boardTitleB),
      new HomepageBoardTitleDto("C 版块标题", "boardTitleC", "C 版块标题名称", this.homepageSettings.boardTitleC),
      new HomepageBoardTitleDto("D 版块标题", "boardTitleD", "D 版块标题名称", this.homepageSettings.boardTitleD),
      new HomepageBoardTitleDto("E 版块标题", "boardTitleE", "E 版块标题名称", this.homepageSettings.boardTitleE),
      new HomepageBoardTitleDto("F 版块标题", "boardTitleF", "F 版块标题名称", this.homepageSettings.boardTitleF)
    ];

    this.colorSettings = [
      new HomepageColorSettingsDto("菜单背景色", "menuBackgroundColor", "菜单背景色", this.homepageSettings.menuBackgroundColor),
      new HomepageColorSettingsDto("二级菜单背景色", "menuSecondaryBackgroundColor", "二级菜单背景色", this.homepageSettings.menuSecondaryBackgroundColor),
      new HomepageColorSettingsDto("菜单选中背景色", "menuBackgroundFocusColor", "菜单选中背景色", this.homepageSettings.menuBackgroundFocusColor),
      new HomepageColorSettingsDto("菜单文字颜色", "menuTextColor", "菜单文字颜色", this.homepageSettings.menuTextColor),
      new HomepageColorSettingsDto("菜单选中文字颜色", "menuTextFocusColor", "菜单选中文字颜色", this.homepageSettings.menuTextFocusColor),
      new HomepageColorSettingsDto("主页版块标题背景色", "boardBackgroundColor", "主页版块标题背景色", this.homepageSettings.boardBackgroundColor),
      new HomepageColorSettingsDto("主页版块标题文字色", "boardTextColor", "主页版块标题文字色", this.homepageSettings.boardTextColor)
    ];
  }

  initHomepageSettingValues(): void {
    this.adminSystemSettingsService.get<HomepageSettingsDto>(SystemSettingTypeEnum.HomePage).subscribe(response => {
      this.homepageSettings = response;
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
  }

}
