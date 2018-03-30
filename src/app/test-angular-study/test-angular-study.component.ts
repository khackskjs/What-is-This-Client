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
    if (gUserService.isUserSignedIn()) {
      gUserService.renewUserInfo();
    }
    else {
      console.error(`Login 페이지로 이동 해야 함`);
    }
  }
  
  ngOnInit() {
  }
  
  signIn() {
    this.gUserService.signIn();
  }
}