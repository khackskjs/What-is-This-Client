import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import DataService from './common/dataService';
import { CardReviewComponent } from './card-review/card-review.component';
import { TestAngularStudyComponent } from './test-angular-study/test-angular-study.component';
import { clock } from './common/reducers';
@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    CardReviewComponent,
    TestAngularStudyComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ reducer: clock })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
