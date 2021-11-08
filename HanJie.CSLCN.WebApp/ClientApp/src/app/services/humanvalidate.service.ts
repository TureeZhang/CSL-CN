
import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({ providedIn: "root" })
export class HumanValidateService implements OnInit {

  private uploadUrl: string = "/api/upload";
  private token: string;

  constructor(private httpHelper: CSLHttpHelper) {

  }

  ngOnInit(): void {

  }

  getUploadToken(localFileName: string): Promise<any> {
    localFileName = encodeURI(localFileName);
    let promise: Promise<any> = this.httpHelper.get<any>(this.uploadUrl + "?storageFullName=" + localFileName)
      .toPromise();

    return promise;
  }
}
