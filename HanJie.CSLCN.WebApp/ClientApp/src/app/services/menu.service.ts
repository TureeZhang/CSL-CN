import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuDto } from '../models/menu-dto';
import { CSLHttpHelper } from '../commons/http-helper';
import { retry } from 'rxjs/operators';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';

@Injectable({ providedIn: "root" })
export class MenuService {

  private menusUrl: string = "/api/menus";

  constructor(private httpHelper: CSLHttpHelper) {

  }

  getMenus(): Observable<MenuDto[]> {
    return this.httpHelper.get<MenuDto[]>(this.menusUrl);
  }
}
