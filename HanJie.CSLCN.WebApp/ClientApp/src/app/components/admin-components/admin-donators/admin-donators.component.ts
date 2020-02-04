import { Component, OnInit } from '@angular/core';
import { DonatorRankDto } from '../../../models/donator-rank-dto';

@Component({
  selector: 'admin-donators',
  templateUrl: './admin-donators.component.html',
  styleUrls: ['./admin-donators.component.css']
})
export class AdminDonatorsComponent implements OnInit {

  public datas: DonatorRankDto[];

  constructor() {

  }

  ngOnInit(): void {

  }

}
