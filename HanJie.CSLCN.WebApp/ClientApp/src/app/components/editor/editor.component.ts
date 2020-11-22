import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CodeMirrorOptions } from '../../models/code-mirror-options';
import { Observable } from 'rxjs';


@Component({
    selector: 'editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {


    public options: CodeMirrorOptions = {
        lineNumbers: true, theme: "material", mode: "markdown", cursorHeight: 0.85
    };

    @Input()
    public contentModel: string;
    @Output()
    contentModelChange: EventEmitter<string> = new EventEmitter<string>();


    @Output()
    public onChange: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {

    }




}
