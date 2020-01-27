
import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { QiniuStorageInfoDto } from '../models/qiniu-storage-info-dto';
import { promise } from 'protractor';
import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';

@Injectable({ providedIn: "root" })
export class QiniuUploadService implements OnInit {

  private qiniuUploadUrl: string = "/api/qiniuupload";
  private token: string;

  constructor(private httpHelper: CSLHttpHelper) {

  }

  ngOnInit(): void {

  }

  getQiniuUploadToken(localFileName: string): Promise<any> {
    localFileName = encodeURI(localFileName);
    let promise: Promise<any> = this.httpHelper.get<any>(this.qiniuUploadUrl + "?storageFullName=" + localFileName)
      .toPromise();

    return promise;
  }
}
