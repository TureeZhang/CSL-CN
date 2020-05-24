import { Injectable } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { WikiListItemDto } from '../models/wiki-list-item-dto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LastModifyWikisService {

    private wikiListUrl = "/api/lastmodifywikis";

    constructor(private http: CSLHttpHelper) {

    }

    list(): Observable<WikiListItemDto[]> {
        return this.http.get<WikiListItemDto[]>(this.wikiListUrl);
    }

}
