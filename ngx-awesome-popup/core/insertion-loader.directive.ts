import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInsertionLoader]'
})
export class InsertionLoaderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
