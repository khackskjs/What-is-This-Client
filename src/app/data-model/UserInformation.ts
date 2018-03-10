export default class UserInformation {
  userId: String;
  reviewDayCount: Number;   // 학습 시작한지 몇일째 되는 날인지 정보.

  constructor(userId) {
    this.resetReviewDayCount();
    this.userId = userId
  }
  
  public resetReviewDayCount() {
    this.reviewDayCount = 1;
  }
}