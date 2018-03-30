export default class OAuthInformation {
  familyName:         String;
  givenName:          String;
  email:              String;
  reviewDayCount:     number;   // 학습 시작한지 몇일째 되는 날인지 정보.
  lastLoginDatetime:  Date;     // Client Local Time 기준으로 최종 로그인 시간(로그인 시도 시 현시간으로)
  constructor() {}
  
  public resetReviewDayCount() {
    this.reviewDayCount = 1;
  }

  public getLoginFormat() {
    return { email: this.email };
  }
  /**
   * 
   * @param {JSON} oauthInfo - oauth information from DB
   */
  public static parse(oauthInfo) {
    const oauth = new OAuthInformation();
    oauth.familyName = oauthInfo.familyName;
    oauth.givenName = oauthInfo.givenName;
    oauth.email = oauthInfo.email;
    oauth.reviewDayCount = oauthInfo.reviewDayCount;
    oauth.lastLoginDatetime = oauthInfo.lastLoginDatetime;
    return oauth;
  }
}