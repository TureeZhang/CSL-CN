import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CodeMirrorOptions } from '../../models/code-mirror-options';
import { Observable } from 'rxjs';
import { NzDrawerService } from 'ng-zorro-antd';
import { UploaderComponent } from '../uploader/uploader.component';
import { UploaderUsageEnum } from '../../models/uploader-usage.enum';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';


@Component({
    selector: 'editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

    private routePath: string;

    public options: CodeMirrorOptions = {
        lineNumbers: true, theme: "material", mode: "markdown", cursorHeight: 0.85
    };

    @Input()
    public contentModel: string;
    @Output()
    contentModelChange: EventEmitter<string> = new EventEmitter<string>();


    @Output()
    public onChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(private route: ActivatedRoute,
        private drawerService: NzDrawerService,
        private globalService: GlobalService) { }

    ngOnInit(): void {
        this.routePath = this.route.snapshot.paramMap.get("id");
    }

    openUploader(): void {
        const drawerRef = this.drawerService.create<UploaderComponent, { directoryPath: string, usage: UploaderUsageEnum }, string>({
            nzTitle: '上传图片',
            nzContent: UploaderComponent,
            nzPlacement: 'top',
            nzContentParams: {
                directoryPath: `wiki-passages/${this.routePath}`,
                usage: UploaderUsageEnum.wiki
            },
        });

        drawerRef.afterOpen.subscribe(() => {
            console.log('Drawer(Component) open');
        });

        drawerRef.afterClose.subscribe(data => {
            console.log(data);
            if (typeof data === 'string') {
                console.log(data.toString());
                //this.value = data;
            }
        });
    }

    saveLocalStorage() {
        localStorage.setItem(this.routePath, this.contentModel);
        this.globalService.successTip(`已成功保存草稿：${this.routePath}。${Date.now.toString()}`);
    }

    restoreLocalStorage() {
        let content = localStorage.getItem(this.routePath);
        if (content) {
            this.contentModelChange.emit(content);
            this.globalService.successTip(`已成功恢复草稿：${this.routePath}`);
        }
        else {
            this.globalService.WarningTip("未在当前文档发现草稿。");
        }

    }


}
