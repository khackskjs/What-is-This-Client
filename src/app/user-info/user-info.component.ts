import { Component, OnInit } from '@angular/core';
import UserInformation from '../data-model/UserInformation';
import UserInfoService from '../common/userInforService';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
  userId: String;
  reviewDayCount: Number;

  constructor(private userInfoService: UserInfoService) {
    this.userId = userInfoService.getUserId();
    this.reviewDayCount = userInfoService.getReviewDayCount();
  }

  onUserIdChange() {
    this.userInfoService.setUserId(this.userId);
  }
  onReviewDayCountChange() {
    this.userInfoService.setReviewDayCount(this.reviewDayCount);
  }
  ngOnInit() {
  }

}
