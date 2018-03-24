import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { GoogleApiModule, GoogleApiService, GoogleAuthService, NgGapiClientConfig, NG_GAPI_CONFIG, GoogleApiConfig } from 'ng-gapi';
import BasicProfile = gapi.auth2.BasicProfile;
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import OAuthInformation from '../data-model/OAuthInformation';

@Injectable()
export class GoogleUserService {
  public static SESSION_STORAGE_KEY: string = 'accessToken';
  public static SESSION_EXPIRES_AT: string = 'expiresAt';
  public static USER_GIVEN_NAME: string = 'givenName';
  public static USER_FAMILY_NAME: string = 'familyName';
  public static USER_EMAIL: string = 'email';
  private oAuthInfo: OAuthInformation;

  constructor(private googleAuth: GoogleAuthService) {
    if (this.isUserSignedIn()) {
      this.oAuthInfo = this.generateOAuthInfo();
    }
  }

  public signIn(): void {
    this.googleAuth.getAuth()
      .subscribe((auth: GoogleAuth) => {
        auth.signIn().then(this.signInSuccessHandler);
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

  /**
   * sessionStorage check 부터 수행해야.
   */
  private generateOAuthInfo(): OAuthInformation {
    if(!this.isUserSignedIn()) {
      throw new Error();
    }

    let oAuth = new OAuthInformation(),
        fName = sessionStorage.getItem(GoogleUserService.USER_FAMILY_NAME),
        gName = sessionStorage.getItem(GoogleUserService.USER_GIVEN_NAME),
        email = sessionStorage.getItem(GoogleUserService.USER_EMAIL);
    
    [oAuth.familyName, oAuth.givenName, oAuth.email] = [fName, gName, email];
    return oAuth;
  }

  private clearSession() {
    sessionStorage.removeItem(GoogleUserService.USER_FAMILY_NAME);
    sessionStorage.removeItem(GoogleUserService.USER_GIVEN_NAME);
    sessionStorage.removeItem(GoogleUserService.USER_EMAIL);
    sessionStorage.removeItem(GoogleUserService.SESSION_EXPIRES_AT);
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