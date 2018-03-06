import { Component, OnInit, Output, Input, ViewEncapsulation } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';

import UserInput from '../data-model/UserInput';
import DataService from '../common/dataService';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  userInput: UserInput;
  cardType = {  // 나중에 각 자리를 리용해서 bitwise 연산해서, userInput.cardType 에 대응할 것
    "0": true,  // Sentense
    "1": false,
    "2": false,
  };
  
  ngOnInit() {
  }

  constructor(private dataService: DataService) {
    this.userInput = new UserInput();
  }

  private clearUserInput() {
    this.userInput.korean = '';
    this.userInput.english = '';
  }

  submitUserInput(userInput, element) {
    this.dataService.addNewCard(userInput);

    this.clearUserInput();
    element.focus();

  }

  onGenDateChange(date) {
    this.userInput.genDate = date;
  }
  onReviewDatesChange(event, dates) {
    this.userInput.setReviewDates(dates);
  }
}
