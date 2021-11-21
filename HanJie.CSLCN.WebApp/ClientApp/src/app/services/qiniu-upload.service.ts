
import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { QiniuStorageInfoDto } from '../models/qiniu-storage-info-dto';
import { promise } from 'protractor';

@Injectable({ providedIn: "root" })
export class QiniuUploadService implements OnInit {

  private uploadUrl: string = "/api/upload";
  private token: string;

  constructor(private httpHelper: CSLHttpHelper) {

  }

  ngOnInit(): void {

  }

  async getUploadToken(localFileName: string): Promise<string> {
    localFileName = encodeURI(localFileName);
    let promise: Promise<any> = this.httpHelper.get<string>(this.uploadUrl + "?storageFullName=" + localFileName)
      .toPromise();

    return promise;
  }
}
