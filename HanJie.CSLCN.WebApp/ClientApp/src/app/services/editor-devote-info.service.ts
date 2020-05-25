import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditorDevoteInfoDto } from '../models/editor-devote-info-dto';
import { CSLHttpHelper } from '../commons/http-helper';

@Injectable({
  providedIn: 'root'
})
export class EditorDevoteInfoService {

    private editorDevoteInfoUrl:string = "/api/editordevotelist";

    constructor(private httpHelper:CSLHttpHelper) { }

    listAllEditorDevoteInfoes(): Observable<EditorDevoteInfoDto[]> {
        return this.httpHelper.get<EditorDevoteInfoDto[]>(this.editorDevoteInfoUrl)
    }
}
