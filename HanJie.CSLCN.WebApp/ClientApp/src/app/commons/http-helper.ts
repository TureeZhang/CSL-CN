import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, observable, throwError } from 'rxjs';
import { MenuDto } from '../models/menu-dto';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { JSDocCommentStmt } from '@angular/compiler';
import { GlobalService } from '../services/global.service';
import { NzModalService } from 'ng-zorro-antd';

@Injectable({ providedIn: "root" })
export class CSLHttpHelper {

  /***
   *服务端主 host 地址段前缀
   ***/
  private cslHostUrl: string = this.getBackServerHostUrl();
  public static modalService: NzModalService;

  constructor(private http: HttpClient,
    private nzModalService: NzModalService) {
    CSLHttpHelper.modalService = nzModalService;
  }

  /**
   * 向服务端 API 发起 get 请求
   * @param url API 接口相对路径。eg. "/api/menus"
   */
  get<TResult>(url: string): Observable<TResult> {
    return this.http.get<TResult>(this.cslHostUrl + url)
      .pipe(
        catchError(this.handleError)
      );
  }

  put<TData, TResult>(url: string, datas: TData): Observable<TResult> {
    return this.http.put<TResult>(this.cslHostUrl + url,
      JSON.stringify(datas),
      {
        headers:
          new HttpHeaders().append("Content-Type", "application/json")
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * 向服务端 API 发起 post 请求
   * @param url API 接口相对路径。eg. "/api/menus"
   */
  post<TData, TResult>(url: string, datas: TData): Observable<TResult> {   //object仅允许传输对象，其中的方法不允许被调用。在此处作为承载数据的模型类型
    return this.http.post<TResult>(this.cslHostUrl + url,
      JSON.stringify(datas),
      {
        headers:
          new HttpHeaders().append("Content-Type", "application/json")
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(url: string, id: number): Observable<object> {
    let host: CSLHttpHelper = this;
    return this.http.delete(this.cslHostUrl + url + "?id=" + id,
      {
        headers:
          new HttpHeaders().append("Content-Type", "application/json")
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  getBackServerHostUrl(): string {
    let host: string = document.location.host;
    let apiHostUrl: string = "http://";

    if (host == "www.cities-skylines.cn") {
      apiHostUrl += "www.cities-skylines.cn";
    }
    else {
      apiHostUrl += "localhost:5500";
    }

    return apiHostUrl;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    if (err.status === 400) {
      CSLHttpHelper.modalService.error({
        nzTitle: '哦豁',
        nzContent: err.error.errMsg
      });
    }
    else if (err.status === 0) {
      CSLHttpHelper.modalService.error({
        nzTitle: '服务器连接失败',
        nzContent: err.message,
        nzWidth: "90%"
      });
    }
    else {
      CSLHttpHelper.modalService.error({
        nzTitle: '服务器错误（BUG，方便的话截图给骚汉哦感谢！）',
        nzContent: err.error,
        nzWidth: "90%"
      });
    }
    return throwError(err.error.errMsg);
  }

}
