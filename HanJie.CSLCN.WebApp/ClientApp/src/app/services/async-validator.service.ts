import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CSLHttpHelper } from '../commons/http-helper';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorService {

  url = "/api/asyncvalidator";

  constructor(private httpHelper: CSLHttpHelper) {

  }

  isContainSensitiveWord(testword: string): Observable<boolean> {
    return this.httpHelper.get<boolean>(`${this.url}/sensitiveword?testword=${testword}`);
  }

}
