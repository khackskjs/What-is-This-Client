import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CardInformation, REVIEW_RESULT } from '../data-model/CardInformation';
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
  isUpdatingResult: Boolean = false;    // server 와 통신간에 UI 막고, 풀기 위함

  ngOnInit() {}
  constructor(private dataService:DataService, private userService: UserService) {
    this.reviewDayCount = this.userService.getReviewDayCount();
    this.cardList = new Array<CardInformation>();
    this.roadCards();
  }

  makeRequest() {
    let userId: String = this.userService.getUserId();
    let reviewDayCount = this.reviewDayCount;
    return { userId, reviewDayCount };
  }

  updateAllCardReviewResult() {
    this.disableUI();
    var userInfo: UserInformation = new UserInformation();
    userInfo.userId = this.userService.getUserId();
    userInfo.reviewDayCount = this.reviewDayCount || this.userService.getReviewDayCount();

    this.dataService.requestUpdatingAllCardReviewResult(userInfo)
      .subscribe(data => {
        this.roadCards();
      });
  }

  suffleCards() {
    this.cardList = this.arrangeNonReviewCardsFirst(this.shuffle(this.cardList));
  }

  private roadCards() {
    let reqParams = this.makeRequest();
    this.dataService.getCards(reqParams)
      .subscribe((cardList: Array<CardInformation>) => {
        this.cardList = this.arrangeNonReviewCardsFirst(cardList);
        this.enableUI();
      });
  }
  private disableUI() {
    this.isUpdatingResult = true;
  }
  private enableUI() {
    this.isUpdatingResult = false;
  }
  /**
   * 복습 안한 카드를 앞쪽으로 배치
   * @param {Array<CardInformation>} cardList 
   */
  private arrangeNonReviewCardsFirst(cardList: Array<CardInformation>): Array<CardInformation> {
    let nonReviewCardList = cardList.filter(card => card.reviewResult === REVIEW_RESULT.NONE),
        reviewedCardList = cardList.filter(card => card.reviewResult !== REVIEW_RESULT.NONE);
    
    return nonReviewCardList.concat(reviewedCardList);
  }
  /**
   * @param {Array} a
   */
  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}