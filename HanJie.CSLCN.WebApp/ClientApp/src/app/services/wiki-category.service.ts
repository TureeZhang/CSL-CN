import { Injectable } from '@angular/core';
import { CSLHttpHelper } from '../commons/http-helper';
import { Observable } from 'rxjs';
import { WikiCategoryDto } from '../models/wiki-category-dto';

@Injectable({
    providedIn: 'root'
})
export class WikiCategoryService {

    private url: string = "/api/wikicategory"

    constructor(private http: CSLHttpHelper) {
    }

    list(): Observable<WikiCategoryDto> {
        return this.http.get(this.url);
    }
}
