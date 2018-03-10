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
import UserInfoService from './common/userInforService';

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
    NgbModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ reducer: clock })
  ],
  providers: [DataService, UserInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
