import { Component, OnInit, Output, Input, ViewEncapsulation } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';

import { CardInformation } from '../data-model/CardInformation';
import DataService from '../common/dataService';
import UserService from '../common/userService';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  cardInfo: CardInformation;
  cardType = {  // 나중에 각 자리를 리용해서 bitwise 연산해서, cardInfo.cardType 에 대응할 것
    "0": true,  // Sentense
    "1": false,
    "2": false,
  };
  
  ngOnInit() {}

  constructor(private dataService: DataService, private userService: UserService) {
    this.cardInfo = new CardInformation();
    this.cardInfo.nextReviewDayCount = this.cardInfo.referenceDayCount = this.userService.getReviewDayCount();
  }

  private clearUserInput() {
    this.cardInfo.korean = '';
    this.cardInfo.english = '';
  }

  submitUserInput(cardInfo: CardInformation, element) {
    console.log(cardInfo);
    cardInfo.userId = this.userService.getUserId();
    this.dataService.addNewCard(cardInfo)
      .subscribe((data) => {
        console.log(data);
        this.clearUserInput();
        element.focus();
      });
  }

  onGenDateChange(date) {
    this.cardInfo.genDate = date;
  }
  onReviewDatesChange(event, dates) {
    this.cardInfo.setReviewDates(dates);
  }
}
