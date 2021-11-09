import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonatorRankService } from '../../services/donator-rank.service';
import { DonatorRankDto } from '../../models/donator-rank-dto';
import { UserInfoService } from '../../services/user-info.service';
import { UploadFile, NzTabComponent, NzTabChangeEvent } from 'ng-zorro-antd';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'donator-rank',
  templateUrl: './donator-rank.component.html',
  styleUrls: ['./donator-rank.component.css']
})

export class DonatorRankComponent implements OnInit {

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

  onTabsetChange(event: NzTabChangeEvent): void {
    if (event.index == 1 && this.allRanks == null) {
      this.getAllRanks();
    }
  }

}
