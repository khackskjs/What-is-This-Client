import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { HttpModule } from '@angular/http';
import DataService from './common/dataService';
import { CardReviewComponent } from './card-review/card-review.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    CardReviewComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
