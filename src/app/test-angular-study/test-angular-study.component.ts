import { GoogleUserService } from './../common/gUserService';
import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from 'ng-gapi';

@Component({
  selector: 'app-test-angular-study',
  template: `
    <button type="button"
              (click)="signIn()"
              class="btn btn-block btn-primary"
              translate>
          FORM.BUTTON.PROCEED
    </button>
  `,
  styles: ['']
})
export class TestAngularStudyComponent implements OnInit {
  constructor(private gapiService: GoogleApiService, private gUserService: GoogleUserService) {
    this.gapiService.onLoad().subscribe((data)=> {
      // Here we can use gapi
      console.log('onLoad', data);
      
    });
    
  }
  
  ngOnInit() {
  }
  
  signIn() {
    this.gUserService.signIn();
  }
}