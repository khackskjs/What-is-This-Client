import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import UserInformation from '../data-model/UserInformation';
import { UserInfoComponent } from '../user-info/user-info.component';

const SERVER_URL = 'http://localhost:8000';

@Injectable()
export default class UserService {
  private _userInfo: UserInformation;

  constructor(private http: HttpClient) {
    this._userInfo = new UserInformation();
  }
  
  public setUserId(userId) {
    this._userInfo.userId = userId;
  }
  public getUserId() {
    return this._userInfo.userId;
  }
  public setReviewDayCount(udc) {
    this._userInfo.reviewDayCount = udc;
  }
  public getReviewDayCount() {
    return this._userInfo.reviewDayCount;
  }

  public getCardTypes() {
    return ['Sentence','expression','phrasal verb'];
    // return {
    //   '0': 'Sentence',
    //   '1': 'expression',
    //   '2': 'phrasal verb'
    // }
  }

  public login(userInfo: UserInformation) {
    return this.http.post(`${SERVER_URL}/user/login`, userInfo)
      .map((user: UserInformation) => {
        let userInfo = new UserInformation();
        userInfo.userId = user.userId;
        this._userInfo.reviewDayCount = userInfo.reviewDayCount = user.reviewDayCount;
        this._userInfo.userId = userInfo.userId;
        return userInfo;
      });
  }
}