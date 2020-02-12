import { Component, OnInit } from '@angular/core';
import { WikiListService } from '../../services/wiki-list.service';
import { WikiListItemDto } from '../../models/wiki-list-item-dto';
import { GlobalService } from '../../services/global.service';
import { BreadCrumbDto } from '../../models/bread-crumb';

@Component({
  selector: 'wiki-list',
  templateUrl: './wiki-list.component.html',
  styleUrls: ['./wiki-list.component.css']
})
/** wiki-list component*/
export class WikiListComponent implements OnInit {
  /** wiki-list ctor */

  public displayWikis: WikiListItemDto[];
  private allWikis: WikiListItemDto[];
  public isLoading: boolean = false;
  private searchTimer: NodeJS.Timer;

  constructor(private wikiService: WikiListService,
    private globalService: GlobalService) {

  }

  ngOnInit(): void {
    let crumbs: Array<BreadCrumbDto> = new Array<BreadCrumbDto>();
    crumbs.push(new BreadCrumbDto("/wiki-list", "全部文档"));
    this.globalService.setBreadCrumbs(crumbs);
    this.listAll();
  }

  listAll(): void {
    this.isLoading = true;
    this.wikiService.list().subscribe(response => {
      this.displayWikis = response;
      this.allWikis = response;
      this.isLoading = false;
    });
  }

  search(word: string): void {
    if (this.searchTimer != null)
      clearTimeout(this.searchTimer);

    this.searchTimer = setTimeout(() => {
      this.displayWikis = null;
      if (word === null || word === "") {
        this.displayWikis = this.allWikis;
      } else {
        this.displayWikis = null;
        this.displayWikis = this.allWikis.filter(item => {
          if (item.title.includes(word)) {
            return item;
          }
        });
      }
    }, 300);


  }
}
