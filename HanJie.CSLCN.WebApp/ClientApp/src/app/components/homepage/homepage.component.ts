import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuDto } from '../../models/menu-dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private menuService: MenuService) {

  }

  ngOnInit(): void {
  }

  

}
