import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { MenuDto } from '../models/menu-dto';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { JSDocCommentStmt } from '@angular/compiler';

@Injectable({ providedIn: "root" })
export class CSLHttpHelper {

  /***
   *服务端主 host 地址段前缀
   ***/
  private cslHostUrl: string = this.getHostUrl();

  constructor(private http: HttpClient) { }

  /**
   * 向服务端 API 发起 get 请求
   * @param url API 接口相对路径。eg. "/api/menus"
   */
  get<TResult>(url: string): Observable<TResult> {
    let host: CSLHttpHelper = this;

    return this.http.get<TResult>(this.cslHostUrl + url);
  }

  put<TData, TResult>(url: string, datas: TData): Observable<TResult> {
    let host: CSLHttpHelper = this;

    return this.http.put<TResult>(this.cslHostUrl + url,
      JSON.stringify(datas),
      {
        headers:
          new HttpHeaders().append("Content-Type", "application/json")
      });
  }

  /**
   * 向服务端 API 发起 post 请求
   * @param url API 接口相对路径。eg. "/api/menus"
   */
  post<TData, TResult>(url: string, datas: TData): Observable<TResult> {   //object仅允许传输对象，其中的方法不允许被调用。在此处作为承载数据的模型类型
    let host: CSLHttpHelper = this;

    return this.http.post<TResult>(this.cslHostUrl + url,
      JSON.stringify(datas),
      {
        headers:
          new HttpHeaders().append("Content-Type", "application/json")
      });
  }

  delete(url: string, id: number): Observable<object> {
    let host: CSLHttpHelper = this;
    return this.http.delete(this.cslHostUrl + url + "?id=" + id,
      {
        headers:
          new HttpHeaders().append("Content-Type", "application/json")
      });
  }

  getHostUrl(): string {
    let host: string = document.location.host;
    let apiHostUrl: string = "http://";

    if (host == "www.cities-skylines.cn") {
      apiHostUrl += "www.cities-skylines.cn";
    }
    else if (host == "www.huyahanjie.com") {
      apiHostUrl += "www.huyahanjie.com"
    }
    else {
      apiHostUrl += "localhost:5000";
    }

    return apiHostUrl;
  }

}
