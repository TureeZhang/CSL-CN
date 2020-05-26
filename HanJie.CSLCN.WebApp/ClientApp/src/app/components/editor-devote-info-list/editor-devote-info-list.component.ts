import { Component, OnInit } from '@angular/core';
import { DonatorRankDto } from '../../models/donator-rank-dto';
import { DonatorRankService } from '../../services/donator-rank.service';
import { GlobalService } from '../../services/global.service';
import { UploadFile, NzTabComponent } from 'ng-zorro-antd';
import { EditorDevoteInfoDto } from '../../models/editor-devote-info-dto';
import { EditorDevoteInfoService } from '../../services/editor-devote-info.service';

@Component({
    selector: 'app-editor-devote-info-list',
    templateUrl: './editor-devote-info-list.component.html',
    styleUrls: ['./editor-devote-info-list.component.css']
})
export class EditorDevoteInfoListComponent implements OnInit {

    public allEditors: EditorDevoteInfoDto[];
    public monthlyEditors: EditorDevoteInfoDto[];
    public monthlyEditorsLoading: boolean = false;
    public allEditorsLoading: boolean = false;

    constructor(private editorDevoteInfoService: EditorDevoteInfoService,
        public globalService: GlobalService) {

    }

    ngOnInit(): void {
        this.getMonthlyEditors();
    }

    getAllEditors(): void {
        this.allEditorsLoading = true;
        this.editorDevoteInfoService.listAllEditorDevoteInfoes().subscribe(datas => {
            this.allEditors = datas;
            this.allEditorsLoading = false;
        });
    }

    getMonthlyEditors(): void {
        this.monthlyEditorsLoading = true;
        this.editorDevoteInfoService.listMonthlyEditorDevoteInfoes().subscribe(datas => {
            this.monthlyEditors = datas;
            this.monthlyEditorsLoading = false;
        });
    }

    onTabsetChange(event: { index: number, tab: NzTabComponent }): void {
        if (event.index == 1 && this.allEditors == null) {
            this.getAllEditors();
        }
    }

}
