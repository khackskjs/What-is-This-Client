import { Component, OnInit, Output, Input, ViewEncapsulation } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';

import { CardInformation } from '../data-model/CardInformation';
import DataService from '../common/dataService';
import UserService from '../common/userService';

import { NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown'
@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  cardInfo: CardInformation;
  cardTypes: Array<boolean> = [];  // 나중에 각 자리를 리용해서 bitwise 연산해서, cardInfo.cardType 에 대응할 것
  cardTypeNameList: Array<string>; // user가 지정한 card 종류 이름
  cardTypeString: string;
  
  ngOnInit() {}
  constructor(private dataService: DataService, private userService: UserService) {
    this.cardInfo = new CardInformation();
    this.cardInfo.nextReviewDayCount = this.cardInfo.referenceDayCount = this.userService.getReviewDayCount();
    this.cardTypeNameList = this.userService.getCardTypes();
    this.cardTypeNameList.forEach(t => this.cardTypes.push(false));
    this.selectCardType(0);

    console.log(this.cardTypeNameList.toString())
    console.log(this.cardTypes)
  }



  private clearUserInput() {
    this.cardInfo.korean = '';
    this.cardInfo.english = '';
  }

  submitUserInput(cardInfo: CardInformation, element) {
    let uid = cardInfo.userId = this.userService.getUserId();
    if (!uid) {
      return;
      // return alert('add card after Login');
    }
    this.dataService.addNewCard(cardInfo)
      .subscribe((data) => {
        this.clearUserInput();
        this.cardInfo.genDate = new Date();
        element.focus();
      });
  }

  onGenDateChange(date) {
    this.cardInfo.genDate = date;
  }
  onReviewDatesChange(event, dates) {
    this.cardInfo.setReviewDates(dates);
  }

  ct = 0;
  private selectCardType(idx) {
    this.cardTypes[idx] = !this.cardTypes[idx];
    this.cardTypeString = this.cardTypeNameList.filter((val, idx) => this.cardTypes[idx]).join(', ');// toString();
    this.cardInfo.cardType ^= 1 << idx;
    console.log('this.cardInfo.cardType', this.cardInfo.cardType)
  }
}
