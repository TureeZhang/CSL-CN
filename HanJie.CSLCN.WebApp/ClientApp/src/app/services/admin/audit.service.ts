import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CSLHttpHelper } from 'src/app/commons/http-helper';
import { WikiPassageCommentDto } from 'src/app/models/wiki-passage-comment-dto';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private httpHelper: CSLHttpHelper) {

  }

  public ConfirmUser(userId: number): Observable<any> {
    return this.httpHelper.get<void>(`/api/audit/confirmuser?userid=${userId}`);
  }

  public RejectUser(userId: number, reason: string): Observable<any> {
    return this.httpHelper.get<void>(`/api/audit/rejectuser?userid=${userId}&reason=${reason}`);
  }

  public listOnAuditingWikiComment(): Observable<WikiPassageCommentDto[]> {
    return this.httpHelper.get("/api/audit/list-onauditing-comments");
  }

  public ConfirmWikiComment(commentId: number): Observable<void> {
    return this.httpHelper.get(`/api/audit/confirmwikicomment?id=${commentId}`)
  }

  public RejectWikiComment(commentId: number, reason: string): Observable<void> {
    return this.httpHelper.get(`/api/audit/rejectcomment?id=${commentId}&reason=${reason}`);
  }



}
