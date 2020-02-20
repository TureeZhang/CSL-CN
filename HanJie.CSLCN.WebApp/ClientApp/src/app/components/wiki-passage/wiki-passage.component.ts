import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { WikiPassageDto } from 'src/app/models/wiki-passage-dto';
import { WikiPassageService } from 'src/app/services/wiki-passage.service';
import { WikiPassagePageStatusEnum } from 'src/app/models/enums/wiki-passage-page-status.enum';
import { UserInfoService } from '../../services/user-info.service';
import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { NzDrawerService, NzDrawerRef, NzTableComponent } from 'ng-zorro-antd';
import { UploaderComponent } from '../uploader/uploader.component';
import { UploaderUsageEnum } from '../../models/uploader-usage.enum';
import { AdminCreateWikipassageComponent } from '../admin-components/admin-wikipassages/admin-create-wikipassage/admin-create-wikipassage.component';
import { GlobalService } from '../../services/global.service';
import { BreadCrumbDto } from '../../models/bread-crumb';
import { UserInfoDto } from '../../models/user-info-dto';
import { ReplaceTableDirective } from '../../directives/replace-table.service';

@Component({
  selector: 'wiki-passage',
  templateUrl: './wiki-passage.component.html',
  styleUrls: ['./wiki-passage.component.css']
})
export class WikiPassageComponent implements OnInit {


  /***
   * 从路由信息中抓取的文章路由编号
   ***/
  public routePath: string
  /***
   * 从服务端获取的维基文章对象
   ***/
  public wikiPassage: WikiPassageDto;
  /***
   * 存储旧的维基文档内容，用于比对用户是否确实修改了文章内容
   ***/
  public oldWikiPassageDtoContent: string;

  public loading: boolean = true;


  public color: string = "lightblue";
  /***
   * 页面状态。（处于展示状态，或有权限的用户正在进行编辑时显示md编辑器）
   ***/
  public pageStatus: WikiPassagePageStatusEnum = WikiPassagePageStatusEnum.Displaying;

  public isAdmin: boolean = false;

  public currentUser: UserInfoDto;

  public isEditLocked: boolean = false;

  private imStillOnlineTimer: NodeJS.Timer;

  public isLoadingEditButton: boolean = false;
  public isLoadingSaveButton: boolean = false;

  @ViewChild(ReplaceTableDirective, { static: true })
  replaceTableHost: ReplaceTableDirective;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private wikiPassageService: WikiPassageService,
    private drawerService: NzDrawerService,
    private userInfoService: UserInfoService,
    private globalService: GlobalService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    //从路由中抓取文章路由地址
    this.getParamsMapId();

    //检查是否为管理员
    this.userInfoService.getCurrentLoginedUserInfo().subscribe(response => {
      this.currentUser = response;
      this.isAdmin = response.isAdmin;
    });
  }

  /***
   *从路由中抓取文章路由地址编号。
   * */
  private getParamsMapId(): void {
    let host: WikiPassageComponent = this;
    this.routePath = this.route.snapshot.paramMap.get("id");
    host.getWikiPassage(host.routePath);
    this.router.events.subscribe((event) => {
      if (event.toString().startsWith("NavigationEnd")) {
        if (this.route.snapshot.paramMap.get("id") != host.routePath) {
          host.routePath = this.route.snapshot.paramMap.get("id");
          host.getWikiPassage(host.routePath);
        }
      }
    });
  }

  getWikiPassage(routePath: string): void {
    let host: WikiPassageComponent = this;
    this.wikiPassageService.getWikiPassage(routePath).subscribe(response => {
      host.wikiPassage = response;
      host.oldWikiPassageDtoContent = host.wikiPassage.content;
      host.loading = false;
      this.setBreadCrumbs();

      //锁定编辑
      if (response.editingUser != null && response.editingUser.id != this.currentUser.id) {
        this.isEditLocked = true;
      }
    });
  }

  /**
   *更新面包屑导航
   * */
  setBreadCrumbs(): void {
    let crumbs: Array<BreadCrumbDto> = new Array<BreadCrumbDto>();
    if (this.wikiPassage.breadCrumbs != null) {
      for (var i = 0; i < this.wikiPassage.breadCrumbs.length; i++) {
        crumbs.push(this.wikiPassage.breadCrumbs[i]);
      }
    }
    crumbs.push(new BreadCrumbDto(`/wiki-passage/${this.wikiPassage.routePath}`, this.wikiPassage.title));
    this.globalService.setBreadCrumbs(crumbs);
  }

  private edit(): void {
    this.isLoadingEditButton = true;
    this.wikiPassageService.lockPassageEditingStatus(this.wikiPassage.id).subscribe(response => {
      if (response === true) {
        this.pageStatus = WikiPassagePageStatusEnum.Editing;
        this.isEditLocked = true;
        this.wikiPassage.editingUser = this.currentUser;
        this.globalService.successTip(`【已为你锁定】其他用户暂无权编辑，直至你完成保存。`);
        this.startImStillOnlineCall();
      } else {
        this.globalService.ErrorTip(`【失败】其他用户正在进行编辑，请刷新查看。`);
      }
      this.isLoadingEditButton = false;
    });
  }

  private startImStillOnlineCall(): void {
    this.wikiPassageService.imStillOnlineCall(this.wikiPassage.id).subscribe(response => { });
    this.imStillOnlineTimer = setTimeout(() => {
      this.startImStillOnlineCall();
    }, 15000);
  }

  private update(): void {
    this.isLoadingSaveButton = true;
    if (this.wikiPassage.content != this.oldWikiPassageDtoContent) {
      this.wikiPassageService.putWikiPassage(this.wikiPassage).subscribe(response => {
        this.isLoadingSaveButton = false;
        clearTimeout(this.imStillOnlineTimer);
        this.isEditLocked = false;
        this.pageStatus = WikiPassagePageStatusEnum.Displaying;
        this.globalService.successTip(`【保存成功】锁定解除，已释放编辑权限。`);
      });
    }
  }

  openUploader(): void {
    const drawerRef = this.drawerService.create<UploaderComponent, { directoryPath: string, usage: UploaderUsageEnum }, string>({
      nzTitle: '上传图片',
      nzContent: UploaderComponent,
      nzPlacement: 'top',
      nzContentParams: {
        directoryPath: `wiki-passages/${this.routePath}`,
        usage: UploaderUsageEnum.wiki
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        console.log(data.toString());
        //this.value = data;
      }
    });
  }

  createChildPage(): void {
    let drawerRef: NzDrawerRef = this.drawerService.create<AdminCreateWikipassageComponent, { prefix: string, parentPassageId: number }>({
      nzTitle: "添加子文档",
      nzPlacement: 'right',
      nzWidth: 320,
      nzContent: AdminCreateWikipassageComponent,
      nzContentParams: {
        prefix: this.routePath + '@',
        parentPassageId: this.wikiPassage.id
      }
    });
    drawerRef.afterOpen.subscribe(response => { });
    drawerRef.afterClose.subscribe(response => {
      this.router.navigate([`/wiki-passage/${response.routePath}`]);
    });
  }

  gotoChildPage(routePath: string) {
    this.router.navigate([`/wiki-passage/${routePath}`]);
  }

}


// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.table = (header: string, body: string) => {
    return '<div style="overflow:auto"><table class="table table-bordered" style="min-width:850px;">' + header + body + '</table></div>';
  };

  renderer.image = (href: string, title: string, text: string) => {
    return '<img src="' + href + '" alt="' + text + '" style="max-width:100%">';
  };

  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}
