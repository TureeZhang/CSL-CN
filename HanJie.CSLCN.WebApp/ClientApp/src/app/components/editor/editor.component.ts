import { Component, OnInit, ViewChild, ComponentFactoryResolver, ElementRef, TemplateRef, EmbeddedViewRef, Renderer2 } from '@angular/core';
import { HtmlRenderDirective } from '../../directives/html-render.directive';
import { NzTableComponent, NzEmptyComponent } from 'ng-zorro-antd';
import { EditorTableComponent } from './editor-table/editor-table.component';
import { EditorH1Component } from './editor-h1/editor-h1.component';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild(HtmlRenderDirective, { static: true })
  htmlRender: HtmlRenderDirective;

  @ViewChild("tablecontenttpl", { static: true })
  tableContentTemplate: TemplateRef<any>;

  markdown: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private render: Renderer2) { }

  ngOnInit(): void {


    //https://hackernoon.com/here-is-what-you-need-to-know-about-dynamic-components-in-angular-ac1e96167f9e
  }

  createDynamicTable(): void {
    this.loadNzTable();
  }

  loadNzTable(): void {
    //https://www.concretepage.com/angular-2/angular-4-renderer2-example#appendChild

    this.htmlRender.viewContainerRef.clear();
    let componentFactory = null;
    let componentRef = null;
    let editorTableComponent = null;
    if (this.markdown.startsWith("# ")) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(EditorH1Component);
    }

    componentRef = this.htmlRender.viewContainerRef.createComponent(componentFactory);

    editorTableComponent = (<EditorH1Component>componentRef.instance);
    editorTableComponent.data = this.markdown.trim().replace("# ", "");

    this.render.appendChild(this.htmlRender.viewContainerRef.element.nativeElement, "<b>context</b>");

    let content: string = "asdasdasdasd";


  }

}
