import { Injectable } from '@angular/core';
import UserInformation from '../data-model/UserInformation';
@Injectable()
export default class UserInfoService {
  userInfo: UserInformation;

  constructor() {
    this.userInfo = new UserInformation('kjs');
  }

  public setUserId(userId) {
    this.userInfo.userId = userId;
  }
  public getUserId() {
    return this.userInfo.userId;
  }
  public setReviewDayCount(udc) {
    this.userInfo.reviewDayCount = udc;
  }
  public getReviewDayCount() {
    return this.userInfo.reviewDayCount;
  }
}