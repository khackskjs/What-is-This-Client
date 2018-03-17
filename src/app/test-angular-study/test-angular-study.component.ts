import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-test-angular-study',
  template: `
  `,
  styles: ['']
})
export class TestAngularStudyComponent implements OnInit {
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.backgroundColor = 'yellow';
  }

  ngOnInit() {
  }
}