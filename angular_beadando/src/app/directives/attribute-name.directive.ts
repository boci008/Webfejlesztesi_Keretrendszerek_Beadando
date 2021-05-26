import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appAttributeName]'
})
export class AttributeNameDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
