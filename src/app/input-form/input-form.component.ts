import { Component, OnInit, Output, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { GoogleUserService } from './../common/gUserService';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';

import { CardInformation } from '../data-model/CardInformation';
import DataService from '../common/dataService';

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
  // child 에서 값을 변경한 다음에 CD 해줘야 함
  ngAfterViewChecked() { this.cdRef.detectChanges(); }

  constructor(private dataService: DataService, private gUserService: GoogleUserService, private cdRef: ChangeDetectorRef) {
    this.cardInfo = new CardInformation();
    this.cardInfo.nextReviewDayCount = this.cardInfo.referenceDayCount = this.gUserService.getReviewDayCount();
    this.cardTypeNameList = this.gUserService.getCardTypes();
    this.cardTypeNameList.forEach(t => this.cardTypes.push(false));
  }

  private clearUserInput() {
    this.cardInfo.korean = '';
    this.cardInfo.english = '';
  }

  submitUserInput(cardInfo: CardInformation, element) {
    let uid = cardInfo.userId = this.gUserService.getUserEmail();
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
}
