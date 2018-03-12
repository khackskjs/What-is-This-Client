import { Component, OnInit } from '@angular/core';
import UserInformation from '../data-model/UserInformation';
import UserService from '../common/userService';

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
  userInfo: UserInformation;
  // userId: String;
  reviewDayCount: Number;

  constructor(private userService: UserService) {
    this.userInfo = new UserInformation();
  }

  ngOnInit() {
  }
  
  login(formValue) {
    let form = formValue.value,
        userInfo = new UserInformation();

    [userInfo.userId, userInfo.userPw] = [form.userId, form.userPw];

    this.userService.login(userInfo)
      .subscribe((userInfo: UserInformation) => {
        this.userInfo = userInfo;
        this.reviewDayCount = userInfo.reviewDayCount;
      });
  }
}
