import { MenuItemDto } from './menu-item-dto';

export class MenuDto {

  /***
   *顶层目录标题
   ***/
  title: string;

  /***
   *图标类型
   ***/
  iconType: string;

  /***
   *路由地址
   ***/
  path: string;

  /***
   *一级目录名称
   ***/
  menuItems: Array<MenuItemDto>;
}
