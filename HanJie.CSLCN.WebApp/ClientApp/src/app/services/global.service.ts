import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { ConfigsDto } from '../models/configs-dto';
import { NzMessageService } from 'ng-zorro-antd';
import { ClipboardService } from 'ngx-clipboard';


@Injectable({ providedIn: "root" })
export class GlobalService {

  private configsUrl: string = "/api/configs";

  public clientAppConfigs: ConfigsDto;

  constructor(private httpHelper: CSLHttpHelper,
    private messageService: NzMessageService,
    private clipboardService: ClipboardService) {
    this.initConfigs();
    this.handleCopyResponseTip();
  }


  initConfigs(): void {
    let host: GlobalService = this;
    this.httpHelper.get<ConfigsDto>(this.configsUrl).subscribe(response => {
      host.clientAppConfigs = response;
    });
  }

  successTip(message: string): void {
    this.messageService.create("success", message);
  }

  ErrorTip(message: string): void {
    this.messageService.create("error", message);
  }

  WarningTip(message: string): void {
    this.messageService.create("warning", message);
  }

  private handleCopyResponseTip(): void {
    this.clipboardService.copyResponse$.subscribe(result => {
      if (result.isSuccess) {
        this.successTip("复制成功");
      }
      //else {
      //  this.ErrorTip("复制失败：请手动复制所需内容。");
      //}
    });
  }



}
