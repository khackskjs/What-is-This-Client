import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CardInformation } from '../data-model/CardInformation';
import DataService from '../common/dataService';
import UserInfoService from '../common/userInforService';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.component.html',
  styleUrls: ['./card-review.component.css']
})
export class CardReviewComponent implements OnInit {
  cardType = {};
  cardList: Array<CardInformation>;
  reviewDayCount: Number;

  constructor(private dataService:DataService, private userInfoService: UserInfoService) {
    this.reviewDayCount = this.userInfoService.getReviewDayCount();
    this.cardList = new Array<CardInformation>();
    
    this.getCards();
  }

  getCards() {
    let reqParams = this.makeRequest();
    this.dataService.getCards(reqParams)
      .subscribe(cardList => {
        this.cardList = cardList;
        console.log(cardList)
      });
  }

  makeRequest() {
    let userId: String = this.userInfoService.getUserId();
    let reviewDayCount = this.reviewDayCount;
    return { userId, reviewDayCount };
  }

  ngOnInit() {}

  onReviewDayCountChange() {
    console.log(this.reviewDayCount)
  }

  private roadCards() {
    console.log('roadCards');
  }

}
