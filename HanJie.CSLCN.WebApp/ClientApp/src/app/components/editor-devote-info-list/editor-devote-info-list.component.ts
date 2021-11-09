import { Component, OnInit } from '@angular/core';
import { DonatorRankDto } from '../../models/donator-rank-dto';
import { DonatorRankService } from '../../services/donator-rank.service';
import { GlobalService } from '../../services/global.service';
import { EditorDevoteInfoDto } from '../../models/editor-devote-info-dto';
import { EditorDevoteInfoService } from '../../services/editor-devote-info.service';
import { NzTabChangeEvent } from 'ng-zorro-antd';

@Component({
    selector: 'editor-devote-info-list',
    templateUrl: './editor-devote-info-list.component.html',
    styleUrls: ['./editor-devote-info-list.component.css']
})
export class EditorDevoteInfoListComponent implements OnInit {

    public isMonthlyEditorsLoading: boolean = false;
    public isAllEditorsLoading: boolean = false;

    public allEditors: EditorDevoteInfoDto[];
    public monthlyEditors: EditorDevoteInfoDto[];

    constructor(private editorDevoteInfoService: EditorDevoteInfoService,
        public globalService: GlobalService) {

    }

    ngOnInit(): void {
        this.getMonthlyEditors();
    }

    getAllEditors(): void {
        this.isAllEditorsLoading = true;
        this.editorDevoteInfoService.listAllEditorDevoteInfoes().subscribe(datas => {
            this.allEditors = datas;
            this.isAllEditorsLoading = false;
        });
    }

    getMonthlyEditors(): void {
        this.isMonthlyEditorsLoading = true;
        this.editorDevoteInfoService.listMonthlyEditorDevoteInfoes().subscribe(datas => {
            this.monthlyEditors = datas;
            this.isMonthlyEditorsLoading = false;
        });
    }

    onTabsetChange(event: NzTabChangeEvent): void {
        if (event.index == 1 && this.allEditors == null) {
            this.getAllEditors();
        }
    }

}
