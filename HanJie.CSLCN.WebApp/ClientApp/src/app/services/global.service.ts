import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { ConfigsDto } from '../models/configs-dto';


@Injectable({ providedIn: "root" })
export class GlobalService {

  private configsUrl: string = "/api/configs";

  public clientAppConfigs: ConfigsDto;

  constructor(private httpHelper: CSLHttpHelper) {
    this.initConfigs();
  }


  initConfigs(): void {
    let host: GlobalService = this;
    this.httpHelper.get<ConfigsDto>(this.configsUrl).subscribe(response => {
      host.clientAppConfigs = response;
    });
  }


}
