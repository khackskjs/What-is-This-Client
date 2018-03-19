import { CardDecksComponent } from './card-review/card-decks/card-decks.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import DataService from './common/dataService';
import { CardReviewComponent } from './card-review/card-review.component';
import { TestAngularStudyComponent } from './test-angular-study/test-angular-study.component';
import { clock } from './common/reducers';
import { UserInfoComponent } from './user-info/user-info.component';
import UserService from './common/userService';

import { GoogleApiModule, GoogleApiService, GoogleAuthService, NgGapiClientConfig, NG_GAPI_CONFIG, GoogleApiConfig } from "ng-gapi";
import { GoogleUserService } from './common/gUserService';

// import { NgGapiClientConfig } from "../environments/gapiClientConfig";
let gapiClientConfig: NgGapiClientConfig = {
  client_id: "",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/analytics"
  ].join(" ")
};

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    CardReviewComponent,
    TestAngularStudyComponent,
    UserInfoComponent,
    CardDecksComponent,
  ],
  imports: [
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    NgbModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ reducer: clock })
  ],
  providers: [DataService, UserService, GoogleUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
