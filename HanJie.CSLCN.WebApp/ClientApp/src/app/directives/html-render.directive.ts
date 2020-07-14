import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[html-render]' })
export class HtmlRenderDirective {
  constructor(public viewContainerRef:ViewContainerRef) {

  }
}
