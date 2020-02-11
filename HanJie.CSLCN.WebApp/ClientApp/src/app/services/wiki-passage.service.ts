import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { WikiPassageDto } from '../models/wiki-passage-dto';
import { encode } from 'punycode';

@Injectable({ providedIn: "root" })
export class WikiPassageService implements OnInit {

  private wikiPassageUrl: string = "/api/wikipassages";
  private wikiRoutePathValidateUrl: string = "/api/wikipassages/isduplicated"
  private wikiLockPassageEditingStatusUrl = "/api/wikipassages/lockpassageeditingstatus";
  private wikiImStillOnlineCallUrl = "/api/wikipassages/imstillonline";

  constructor(private httpHelper: CSLHttpHelper) { }

  ngOnInit(): void {

  }

  getWikiPassage(routePath: string): Observable<WikiPassageDto> {
    return this.httpHelper.get<WikiPassageDto>(this.wikiPassageUrl + "/" + encodeURIComponent(routePath));
  }

  putWikiPassage(dto: WikiPassageDto): Observable<WikiPassageDto> {
    return this.httpHelper.put<WikiPassageDto, WikiPassageDto>(this.wikiPassageUrl, dto);
  }

  postWikiPassage(dto: WikiPassageDto): Observable<WikiPassageDto> {
    return this.httpHelper.post<WikiPassageDto, WikiPassageDto>(this.wikiPassageUrl, dto);
  }

  isRoutePathDuplicated(routePath: string): Observable<boolean> {
    return this.httpHelper.get<boolean>(`${this.wikiRoutePathValidateUrl}?routePath=${routePath}`);
  }

  lockPassageEditingStatus(passageId: number): Observable<boolean> {
    return this.httpHelper.get<boolean>(`${this.wikiLockPassageEditingStatusUrl}?passageId=${passageId}`);
  }

  imStillOnlineCall(passageId: number): Observable<boolean> {
    return this.httpHelper.get<boolean>(`${this.wikiImStillOnlineCallUrl}?passageId=${passageId}`);
  }

}
