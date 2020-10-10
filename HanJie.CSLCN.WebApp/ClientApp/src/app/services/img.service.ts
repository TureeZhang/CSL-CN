import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { ConfigsDto } from '../models/configs-dto';
import { GlobalService } from './global.service';

@Injectable({ providedIn: "root" })
export class ImgService implements OnInit {

    public static isLocalStorage: boolean = false;

    constructor(private globalService: GlobalService,
        private httpHelper: CSLHttpHelper) {

    }

    ngOnInit(): void {

    }

    getCdnMarkdownString(storageFullName: string): string {
        let imgUrl: string = this.getFileUrl(storageFullName);
        let result: string = `![${storageFullName}](${imgUrl})`;

        return result;
    }

    getFileUrl(storageFullName: string): string {
        let fileUrl: string = this.httpHelper.getBackServerHostUrl() + "/api/download?fname=" + encodeURI(storageFullName);
        if (!ImgService.isLocalStorage) {
            fileUrl = `${this.globalService.clientAppConfigs.qiniuCdnHostUri}/${storageFullName}`;
        }
        return fileUrl;
    }


}
