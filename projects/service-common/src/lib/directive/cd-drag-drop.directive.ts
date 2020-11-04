import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[libCdDragDrop]'
})
export class CdDragDropDirective {
  @Input() DataSource;
  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(event: Event) {
    
    event.preventDefault();
    return false;
  }
 
  @HostListener('drop', ['$event']) onDrop(event: Event) {
  }
  
  @HostListener('dragstart', ['$event']) onDropLeave(event: Event) {
  }
}
