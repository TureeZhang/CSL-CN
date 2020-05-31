import { Component, OnInit, Input } from '@angular/core';
import { EditorDevoteInfoDto } from '../../../models/editor-devote-info-dto';

@Component({
    selector: 'editor-list-board',
    templateUrl: './editor-list-board.component.html',
    styleUrls: ['./editor-list-board.component.css']
})
export class EditorListBoardComponent implements OnInit {

    @Input()
    public editors: EditorDevoteInfoDto[];

    @Input()
    public isLoading: boolean = false;

    constructor() { }

    ngOnInit(): void {

    }

}
