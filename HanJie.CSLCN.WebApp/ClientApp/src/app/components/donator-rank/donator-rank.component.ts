import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonatorRankService } from '../../services/donator-rank.service';
import { DonatorRankDto } from '../../models/donator-rank-dto';
import { UserInfoService } from '../../services/user-info.service';
import { UploadFile } from 'ng-zorro-antd';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'donator-rank',
  templateUrl: './donator-rank.component.html',
  styleUrls: ['./donator-rank.component.css']
})

export class DonatorRankComponent implements OnInit {

  public donatorRanks: DonatorRankDto[];
  public loading: boolean = true;
  public isAdmin: boolean = false;
  public file: UploadFile;

  constructor(private donatorRankService: DonatorRankService,
    public globalService: GlobalService) {

  }

  ngOnInit(): void {
    this.getRanks();
    if (UserInfoService.currentUser) {
      this.isAdmin = UserInfoService.currentUser.isAdmin;
    }
  }

  getRanks(): void {
    this.donatorRankService.getRanks().subscribe(datas => {
      this.donatorRanks = datas;
      this.loading = false;
    });
  }

  setCustomerHeader(file: UploadFile): void {
    //file.type = ""
  }

}
