import { Component, OnInit } from '@angular/core';
import { DonatorRankDto } from '../../models/donator-rank-dto';
import { DonatorRankService } from '../../services/donator-rank.service';
import { GlobalService } from '../../services/global.service';
import { UploadFile, NzTabComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-editor-devote-info-list',
  templateUrl: './editor-devote-info-list.component.html',
  styleUrls: ['./editor-devote-info-list.component.css']
})
export class EditorDevoteInfoListComponent implements OnInit {

    public allRanks: DonatorRankDto[];
    public monthlyRanks: DonatorRankDto[];
    public monthlyRanksLoading: boolean = true;
    public allRanksLoading: boolean = true;
    public file: UploadFile;

    constructor(private donatorRankService: DonatorRankService,
        public globalService: GlobalService) {

    }

    ngOnInit(): void {
        this.getMonthlyRank();
    }

    getAllRanks(): void {
        this.donatorRankService.getAllRanks().subscribe(datas => {
            this.allRanks = datas;
            this.allRanksLoading = false;
        });
    }

    getMonthlyRank(): void {
        this.donatorRankService.getMonthlyRanks().subscribe(datas => {
            this.monthlyRanks = datas;
            this.monthlyRanksLoading = false;
        });
    }

    setCustomerHeader(file: UploadFile): void {
        //file.type = ""
    }

    onTabsetChange(event: { index: number, tab: NzTabComponent }): void {
        if (event.index == 1 && this.allRanks == null) {
            this.getAllRanks();
        }
    }

}
