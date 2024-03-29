import { Component, OnInit, Input } from '@angular/core';
import { Observable, forkJoin, Subscription } from 'rxjs';
import { FormArray } from '@angular/forms';
import { UploadFile, UploadChangeParam, NzUploadComponent, UploadXHRArgs, NzDrawerRef, NzUploadXHRArgs, NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd';
import { QiniuUploadService } from '../../services/qiniu-upload.service';
import { QiniuUploadParameters } from '../../models/qiniu-upload-parameters';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { async } from 'rxjs/internal/scheduler/async';
import { GlobalService } from '../../services/global.service';
import { ImgService } from '../../services/img.service';
import { QiniuStorageInfoDto } from '../../models/qiniu-storage-info-dto';
import { ClipboardService, IClipboardResponse } from 'ngx-clipboard';
import { ClipboardResponse } from '../../models/clipboard-response';
import { DrawerStatuService } from '../../services/drawer-statu.service';
import { UploaderUsageEnum } from '../../models/uploader-usage.enum';
import { CSLHttpHelper } from '../../commons/http-helper';

@Component({
    selector: 'uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

    private token: string;
    private uploadFileName: string;

    public fileList: Array<NzUploadFile> = [];
    public isShowUploadButton = true;
    public host: UploaderComponent = this;
    public imageMarkdownString: string = null;
    public fileUrl: string;

    @Input()
    public directoryPath: string = "shared";
    @Input()
    public usage: UploaderUsageEnum = UploaderUsageEnum.wiki;
    @Input()
    public storageFileName: string;
    @Input()
    public sizeLimit: number = 0; //KB
    @Input()
    public fileTypes: string = null; //"image/png,image/jpeg,image/gif,image/bmp"

    constructor(private qiniuUploadService: QiniuUploadService,
        private http: HttpClient,
        private globalService: GlobalService,
        private imgService: ImgService,
        private clipboardService: ClipboardService,
        private drawerRef: NzDrawerRef<string>,
        private httpHelper: CSLHttpHelper) {

    }

    ngOnInit(): void {

    }

    showFilesArray(): void {
        console.log(this.fileList);
    }

    getUploadToken = (file: NzUploadFile, fileList: NzUploadFile[]): Observable<boolean> => {
        let host: UploaderComponent = this;
        return new Observable((observer) => {
            host.uploadFileName = `${host.directoryPath}/${host.storageFileName ?? file.name}${file.name.substring(file.name.lastIndexOf('.'))}`;
            host.qiniuUploadService.getUploadToken(host.uploadFileName).then(res => {
                host.token = res;
                observer.next(true);
                observer.complete();
            });
        });

    }

    customRequest = (item: NzUploadXHRArgs): Subscription => {


        const formData = new FormData();
        if (this.token === "use-local-storage") {
            ImgService.isLocalStorage = true;
            formData.append('file', item.file as any);
            item.action = this.httpHelper.getBackServerHostUrl() + "/api/upload/localstorage";
        }
        else {
            // Create a FormData here to store files and other parameters.
            // tslint:disable-next-line:no-any
            formData.append('file', item.file as any);
            formData.append('key', this.uploadFileName)
            formData.append('token', this.token);
        }
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

    onUploadStatusChanged(data: NzUploadChangeParam): void {
        if (data.type === "start") {
            this.isShowUploadButton = false;
            if (this.fileList.length > 1 && (data.file.name === this.fileList[0].name)) {
                this.fileList.pop();
            }
        }

        if (data.type === "failure") {
            this.isShowUploadButton = true;
        }

        if (data.type === "success") {
            let fileName: string = data.file.response.downloadUrl;
            if (fileName == null)
                fileName = data.file.response.info.FullName;
            this.imageMarkdownString = this.getImageMarkdownString(fileName);
            this.fileUrl = this.imgService.getFileUrl(fileName);
        }
    }

    getImageMarkdownString(storageFullName: string): string {
        let markdown: string = this.imgService.getCdnMarkdownString(storageFullName);
        return markdown;
    }

    copyMarkDownToClipboard(): void {
        this.clipboardService.copy(this.imageMarkdownString);
        let copyResponse: ClipboardResponse = new ClipboardResponse();
        this.clipboardService.pushCopyResponse(copyResponse);
        this.closeDrawer();
    }

    closeDrawer(fileUrl: string = null): void {
        if (this.usage.toString() == UploaderUsageEnum.userAvatar.toString() && DrawerStatuService.createUserDrawerRef != null) {
            DrawerStatuService.createUserDrawerRef.nzOffsetX = 0;
        }
        this.drawerRef.close(fileUrl);
    }

    confirm(): void {
        this.closeDrawer(this.fileUrl);
    }
}
