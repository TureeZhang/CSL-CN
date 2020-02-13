import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[replace-table]' })
export class ReplaceTableDirective {
  constructor(public viewContainerRef:ViewContainerRef) {

  }
}
