export default class UserInformation {
  userId:             String;
  userPw:             String;
  reviewDayCount:     Number;   // 학습 시작한지 몇일째 되는 날인지 정보.
  lastLoginDatetime:  Date;     // Client Local Time 기준으로 최종 로그인 시간(로그인 시도 시 현시간으로)
  constructor() {}
  
  public resetReviewDayCount() {
    this.reviewDayCount = 1;
  }
}