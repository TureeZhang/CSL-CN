import { Injectable, OnInit } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { WikiPassageDto } from '../models/wiki-passage-dto';

@Injectable({ providedIn: "root" })
export class WikiPassageService implements OnInit {

  private wikiPassageUrl: string = "/api/wikipassages";

  constructor(private httpHelper: CSLHttpHelper) { }

  ngOnInit(): void {

  }

  getWikiPassage(routePath: string): Observable<WikiPassageDto> {
    return this.httpHelper.get<WikiPassageDto>(this.wikiPassageUrl + "/" + routePath);
  }

  postWikiPassage(dto: WikiPassageDto): Observable<null> {
    return this.httpHelper.post<WikiPassageDto, null>(this.wikiPassageUrl, dto);
  }

}
