import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'editor-h1',
  templateUrl: './editor-h1.component.html',
  styleUrls: ['./editor-h1.component.css']
})
export class EditorH1Component implements OnInit {

  @Input()
  data: string;

  constructor() { }

  ngOnInit(): void {
  }

}
