import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appConfirmPassword]'
})
export class ConfirmPasswordDirective {

  @Input() initPass?: string;

  constructor(private el: ElementRef) { }

  confirmPasswordMatch() {
    // console.log(this.initPass);
    
    if (this.el.nativeElement.value == this.initPass) {
      this.el.nativeElement.pattern = ".*"
    } else {
      this.el.nativeElement.pattern = ""
    }
  }
  @HostListener('blur') onBlur(evt: any) {
    this.confirmPasswordMatch();
  }

  @HostListener('keyup', ['$event']) inputChanged(event: any) {
    this.confirmPasswordMatch();
  }

}
