import { Injectable, OnInit } from "@angular/core";
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { DonatorRankDto } from '../models/donator-rank-dto';

@Injectable({ providedIn: "root" })
export class DonatorRankService implements OnInit {
  private donatorRankUrl: string = "/api/donatorrank";

  constructor(private httpHelper: CSLHttpHelper) {

  }

  ngOnInit(): void {

  }

  getRanks(): Observable<DonatorRankDto[]> {
    return this.httpHelper.get<DonatorRankDto[]>(this.donatorRankUrl);
  };
}
