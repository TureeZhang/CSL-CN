
import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { QiniuStorageInfoDto } from '../models/qiniu-storage-info-dto';
import { promise } from 'protractor';

@Injectable({ providedIn: "root" })
export class QiniuUploadService implements OnInit {

  private qiniuUploadUrl: string = "/api/qiniuupload";

  constructor(private httpHelper: CSLHttpHelper) {

  }

  ngOnInit(): void {

  }

  async getQiniuUploadToken(localFileName: string): Promise<string> {
    localFileName = encodeURI(localFileName);
    let promise: Promise<string> = this.httpHelper.get<string>(this.qiniuUploadUrl + "?storageFullName=" + localFileName).toPromise();
    return promise;
  }
}
