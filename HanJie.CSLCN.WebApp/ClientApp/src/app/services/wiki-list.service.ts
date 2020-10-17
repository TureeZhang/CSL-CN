import { Injectable } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { WikiListItemDto } from '../models/wiki-list-item-dto';

@Injectable({ providedIn: 'root' })
export class WikiListService {

  private wikiListUrl = "/api/wikilist";

  constructor(private http: CSLHttpHelper) {

  }

  list(): Observable<WikiListItemDto[]> {
    return this.http.get<WikiListItemDto[]>(this.wikiListUrl);
    }

    listCategoryPassages(categoryId: number): Observable<WikiListItemDto[]> {
        return this.http.get(`${this.wikiListUrl}?categoryId=${categoryId}`);
    }
}
