import { Component, OnInit, Input } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { FormArray } from '@angular/forms';
import { UploadFile, UploadChangeParam, NzUploadComponent, UploadXHRArgs } from 'ng-zorro-antd';
import { QiniuUploadService } from '../../services/qiniu-upload.service';
import { QiniuUploadParameters } from '../../models/qiniu-upload-parameters';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';
import { GlobalService } from '../../services/global.service';
import { ImgService } from '../../services/img.service';
import { QiniuStorageInfoDto } from '../../models/qiniu-storage-info-dto';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  public fileList: Array<UploadFile> = [];
  public isShowUploadButton: boolean = this.isShowUploadBtn();
  public host: UploaderComponent = this;

  @Input()
  public directoryPath: string = "/shared";

  constructor(private qiniuUploadService: QiniuUploadService,
    private http: HttpClient,
    private globalService: GlobalService,
    private imgService: ImgService) {

  }

  ngOnInit(): void {
    this.copyToClipboard("123");
  }

  showFilesArray(): void {
    console.log(this.fileList);
  }

  customRequest = async (item: UploadXHRArgs) => {

    let uploadFullName = this.directoryPath + "/" + item.file.name;

    let token: string = null;
    await this.qiniuUploadService.getQiniuUploadToken(uploadFullName).then(data => token = data);

    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('key', uploadFullName)
    formData.append('token', token);
    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: true,
      withCredentials: false
    });
    // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
    return this.http.request(req).subscribe(
      // tslint:disable-next-line no-any
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        item.onError!(err, item.file!);
      }
    );
  };

  isShowUploadBtn(): boolean {
    let result: boolean = true;
    this.fileList.forEach(item => {
      if (item.status === "success") {
        result = false;
        return;
      }
    });
    return result;
  }

  onUploadStatusChanged(data: UploadChangeParam): void {
    if (data.type === "success") {
      let storageInfo: any = data.file.response.info;
      this.copyImgCdnMarkdownString(storageInfo.FullName);
    }
  }

  copyImgCdnMarkdownString(storageFullName: string): void {
    let markdown: string = this.imgService.getCdnMarkdownString(storageFullName);
    this.copyToClipboard(markdown);
  }

  copyToClipboard(value: string): void {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('Copy');
    document.body.removeChild(selBox);
  }

}
