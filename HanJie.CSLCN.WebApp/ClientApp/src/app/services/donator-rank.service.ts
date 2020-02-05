import { Injectable, OnInit } from "@angular/core";
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { DonatorRankDto } from '../models/donator-rank-dto';

@Injectable({ providedIn: "root" })
export class DonatorRankService implements OnInit {
  private donatorAllRankUrl: string = "/api/donatorrank";
  private donatorMonthlyRankUrl: string = "/api/donatorrank-monthly";

  constructor(private httpHelper: CSLHttpHelper) {

  }

  ngOnInit(): void {

  }

  getAllRanks(): Observable<DonatorRankDto[]> {
    return this.httpHelper.get<DonatorRankDto[]>(this.donatorAllRankUrl);
  };

  getMonthlyRanks(): Observable<DonatorRankDto[]> {
    return this.httpHelper.get<DonatorRankDto[]>(this.donatorMonthlyRankUrl);
  }
}
