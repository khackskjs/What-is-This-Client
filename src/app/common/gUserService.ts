import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { GoogleApiModule, GoogleApiService, GoogleAuthService, NgGapiClientConfig, NG_GAPI_CONFIG, GoogleApiConfig } from "ng-gapi";

@Injectable()
export class GoogleUserService {
  public static SESSION_STORAGE_KEY: string = 'accessToken';
  private user: any;//GoogleUser;

  constructor(private googleAuth: GoogleAuthService) {
  }

  public getToken(): string {
    let token: string = sessionStorage.getItem(GoogleUserService.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error("no token set , authentication required");
    }
    return sessionStorage.getItem(GoogleUserService.SESSION_STORAGE_KEY);
  }

  public signIn(): void {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => {
          console.log(res);
          this.signInSuccessHandler(res)
        });
      });
  }

  public signOut(): void {
    this.googleAuth.getAuth().subscribe(auth => {
      try {
        auth.signOut();
      } catch (err) {
        console.error(`gUser signout err`, err);
      }
      sessionStorage.removeItem(GoogleUserService.SESSION_STORAGE_KEY);
    })
  }

  public isUserSignedIn() {
    return !_.isEmpty(sessionStorage.getItem(GoogleUserService.SESSION_STORAGE_KEY));
  }

  private signInSuccessHandler(res: any) {//GoogleUser) {
    this.user = res;
    console.log(res)
    sessionStorage.setItem(
      GoogleUserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
  }
}