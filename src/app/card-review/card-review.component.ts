import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CardInformation } from '../data-model/CardInformation';
import DataService from '../common/dataService';
import UserService from '../common/userService';
import UserInformation from '../data-model/UserInformation';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.component.html',
  styleUrls: ['./card-review.component.css']
})
export class CardReviewComponent implements OnInit {
  cardType = {};
  cardList: Array<CardInformation>;
  reviewDayCount: Number;

  constructor(private dataService:DataService, private userService: UserService) {
    this.reviewDayCount = this.userService.getReviewDayCount();
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
    let userId: String = this.userService.getUserId();
    let reviewDayCount = this.reviewDayCount;
    return { userId, reviewDayCount };
  }

  ngOnInit() {}

  onReviewDayCountChange() {
    console.log(this.reviewDayCount)
  }

  updateAllCardReviewResult() {
    var userInfo: UserInformation = new UserInformation();
    userInfo.userId = this.userService.getUserId();
    userInfo.reviewDayCount = this.userService.getReviewDayCount();
    this.dataService.requestUpdatingAllCardReviewResult(userInfo)
      .subscribe(data => console.log(data));
  }
  private roadCards() {
    this.getCards();
  }

}
