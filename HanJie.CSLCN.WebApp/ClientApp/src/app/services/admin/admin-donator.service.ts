import { Injectable } from '@angular/core';
import { CSLHttpHelper } from '../../commons/http-helper';
import { NzDrawerService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { DonatorRankDto } from '../../models/donator-rank-dto';

@Injectable({ providedIn: 'root' })
export class AdminDonatorService {

  private adminDonatorsUrl = '/api/admin/admindonators';

  constructor(private http: CSLHttpHelper,
    private drawerService: NzDrawerService) {

  }

  getDonators(): Observable<DonatorRankDto[]> {
    return this.http.get<DonatorRankDto[]>(this.adminDonatorsUrl);
  }

  create(data: DonatorRankDto): Observable<DonatorRankDto> {
    return this.http.post<DonatorRankDto, DonatorRankDto>(this.adminDonatorsUrl, data);
  }

}
