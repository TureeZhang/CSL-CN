import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { FormArray } from '@angular/forms';
import { UploadFile, UploadChangeParam } from 'ng-zorro-antd';
import { QiniuUploadService } from '../../services/qiniu-upload.service';
import { QiniuUploadParameters } from '../../models/qiniu-upload-parameters';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  public qiniuUploadParameters: QiniuUploadParameters;
  public fileList: Array<UploadFile> = [];
  public isShowUploadButton: boolean = this.isShowUploadBtn();
  public host: UploaderComponent = this;

  @Input()
  public directoryPath: string;

  constructor(private qiniuUploadService: QiniuUploadService) {

  }

  ngOnInit(): void {
  }

  showFilesArray(): void {
    console.log(this.fileList);
  }

  //Observable 对象 https://blog.csdn.net/qq_35592166/article/details/78281030
  async uploadActionHandler(data: UploadChangeParam): Promise<void> {

    if (data.type === "start") {
      let file: UploadFile = data.file;
      let fileList: UploadFile[] = data.fileList;
      let event: { percent: number } = data.event;

      let uploadFullName = this.host.directoryPath + "/" + file.name;
      let pars = new QiniuUploadParameters();
      pars.key = uploadFullName;

      await this.host.qiniuUploadService.getQiniuUploadToken(uploadFullName).then(token => {
        pars.token = token;
        this.qiniuUploadParameters = pars;
      });

      console.log(this.qiniuUploadParameters);

    }


  }


  beforeUpload(file: UploadFile, fileList: UploadFile[]): void {
    console.log(this);
  }

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

  getIamgeMarkdown(): void {
    this.copyToClipboard("123");
  }

  copyToClipboard(value: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
