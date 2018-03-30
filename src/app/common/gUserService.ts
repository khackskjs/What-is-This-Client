import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { GoogleApiModule, GoogleApiService, GoogleAuthService, NgGapiClientConfig, NG_GAPI_CONFIG, GoogleApiConfig } from 'ng-gapi';
import BasicProfile = gapi.auth2.BasicProfile;
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import OAuthInformation from '../data-model/OAuthInformation';

const SERVER_URL = 'http://localhost:8000';

@Injectable()
export class GoogleUserService {
  public static SESSION_STORAGE_KEY: string = 'accessToken';
  public static SESSION_EXPIRES_AT: string = 'expiresAt';
  public static USER_REVIEW_DAY_COUNT: string = 'reviewDayCount';
  public static USER_GIVEN_NAME: string = 'givenName';
  public static USER_FAMILY_NAME: string = 'familyName';
  public static USER_EMAIL: string = 'email';
  private oAuthInfo: OAuthInformation;

  constructor(private googleAuth: GoogleAuthService, private http: HttpClient) {
    if (this.isUserSignedIn()) {
      this.oAuthInfo = this.generateOAuthInfo();
    }
  }

  public signIn(): void {
    this.googleAuth.getAuth()
      .subscribe((auth: GoogleAuth) => {
        auth.signIn().then(this.signInSuccessHandler.bind(this));
      });
  }

  public signOut(): void {
    this.googleAuth.getAuth().subscribe(auth => {
      try {
        auth.signOut();
      } catch (err) {
        console.error(`gUser signout err`, err);
      }
      this.clearSession();
    })
  }

  public isUserSignedIn(): boolean {
    return !_.isEmpty(sessionStorage.getItem(GoogleUserService.USER_GIVEN_NAME));
  }
  public getUserInfo() {
    return this.oAuthInfo;
  }
  public getUserEmail() {
    return this.oAuthInfo.email;
  }
  public getReviewDayCount() {
    return this.oAuthInfo.reviewDayCount;
  }
  public setReviewDayCount(rdc: number) {
    return this.oAuthInfo.reviewDayCount = rdc;
  }
  public getCardTypes() {
    return ['Sentence','expression','phrasal verb'];
    // return {
    //   '0': 'Sentence',
    //   '1': 'expression',
    //   '2': 'phrasal verb'
    // }
  }
  /**
   * user 정보를 Server(DB)로 부터 받아와서 갱신
   */
  public renewUserInfo() {
    if (!this.oAuthInfo || !this.oAuthInfo.email) {
      throw new Error('oAuthInfo is wrong');
    }
    
    return this.http.post(`${SERVER_URL}/oauth/login`, this.oAuthInfo.getLoginFormat())
                .subscribe((userInfo: any) => {
                  this.oAuthInfo = OAuthInformation.parse(userInfo);
                  sessionStorage.setItem(GoogleUserService.USER_REVIEW_DAY_COUNT, userInfo.reviewDayCount);
                });
  }
  /**
   * sessionStorage check 부터 수행해야.
   */
  private generateOAuthInfo(): OAuthInformation {
    if(!this.isUserSignedIn()) {
      throw new Error();
    }

    const oAuth = new OAuthInformation(),
          fName = sessionStorage.getItem(GoogleUserService.USER_FAMILY_NAME),
          gName = sessionStorage.getItem(GoogleUserService.USER_GIVEN_NAME),
          email = sessionStorage.getItem(GoogleUserService.USER_EMAIL),
          reviewDayCount = Number(sessionStorage.getItem(GoogleUserService.USER_REVIEW_DAY_COUNT));
    
    [oAuth.familyName, oAuth.givenName, oAuth.email, oAuth.reviewDayCount] = [fName, gName, email, reviewDayCount];
    return oAuth;
  }

  private clearSession() {
    sessionStorage.removeItem(GoogleUserService.USER_FAMILY_NAME);
    sessionStorage.removeItem(GoogleUserService.USER_GIVEN_NAME);
    sessionStorage.removeItem(GoogleUserService.USER_EMAIL);
    sessionStorage.removeItem(GoogleUserService.SESSION_EXPIRES_AT);
    sessionStorage.removeItem(GoogleUserService.USER_REVIEW_DAY_COUNT);
  }

  private signInSuccessHandler(gUser: GoogleUser) {
    let bInfo = gUser.getBasicProfile();
    sessionStorage.setItem(GoogleUserService.USER_GIVEN_NAME, bInfo.getGivenName());
    sessionStorage.setItem(GoogleUserService.USER_FAMILY_NAME, bInfo.getFamilyName());
    sessionStorage.setItem(GoogleUserService.USER_EMAIL, bInfo.getEmail());
    sessionStorage.setItem(GoogleUserService.SESSION_EXPIRES_AT, gUser.getAuthResponse().expires_at.toString());

    this.oAuthInfo = this.generateOAuthInfo();
  }
}