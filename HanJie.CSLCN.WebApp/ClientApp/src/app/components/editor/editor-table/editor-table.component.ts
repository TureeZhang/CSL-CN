import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'editor-table',
  templateUrl: './editor-table.component.html',
  styleUrls: ['./editor-table.component.css']
})
export class EditorTableComponent implements OnInit {

  constructor() { }

  @Input()
  data: any[];

  ngOnInit(): void {

  }

}
