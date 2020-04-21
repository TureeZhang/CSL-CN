import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuDto } from '../../models/menu-dto';
import { Observable } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { SystemSettingsService } from '../../services/system-settings.service';

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    public homepageNews: string;

    constructor(private menuService: MenuService,
        public globalService: GlobalService,
        private systemSettingsService: SystemSettingsService) {

    }

    ngOnInit(): void {
        this.systemSettingsService.get().subscribe(response => {
            this.homepageNews = response.homepageNews;
        });
    }



}
