import { GoogleUserService } from './../common/gUserService';
import { Component, OnInit } from '@angular/core';
import UserInformation from '../data-model/UserInformation';

@Component({
  selector: 'app-user-info',
  styles: [`
    .ng-valid {
      border-color: green;
    }
    .ng-invalid {
      border-color: red;
    }
  `],
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
  userFullname = '';
  oauthInfo: any = {};
  userInfo: UserInformation;

  constructor(private gUserService: GoogleUserService) {
    this.userInfo = new UserInformation();
    this.oauthInfo = gUserService.getUserInfo();
    this.userFullname = `${this.oauthInfo.givenName} ${this.oauthInfo.familyName}`;
    console.log(this.oauthInfo)
  }

  ngOnInit() {
  }
}
