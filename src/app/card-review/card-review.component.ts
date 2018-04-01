import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CardInformation, REVIEW_RESULT } from '../data-model/CardInformation';
import DataService from '../common/dataService';
import { GoogleUserService } from './../common/gUserService';
import UserInformation from '../data-model/UserInformation';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.component.html',
  styleUrls: ['./card-review.component.css']
})
export class CardReviewComponent implements OnInit {
  // cardType = {};
  cardList: Array<CardInformation>;
  reviewDayCount: Number;
  isUpdatingResult: Boolean = false;    // server 와 통신간에 UI 막고, 풀기 위함
  
  cardTypeNameList: string[];
  cardType: number;

  private cardListDB: CardInformation[] = [];    // DB 로 부터 받은 card list
  ngOnInit() {}
  // child 에서 값을 변경한 다음에 CD 해줘야 함
  ngAfterViewChecked() { this.cdRef.detectChanges(); }
  
  constructor(private dataService:DataService, private gUserService: GoogleUserService, private cdRef: ChangeDetectorRef) {
    this.cardTypeNameList = this.gUserService.getCardTypes();

    this.reviewDayCount = this.gUserService.getReviewDayCount();
    this.cardList = new Array<CardInformation>();
    this.roadCards();
  }
  private roadCards() {
    let reqParams = this.makeRequest();
    this.dataService.getCards(reqParams)
      .subscribe((cardList: Array<CardInformation>) => {
        this.cardListDB = cardList;
        let cloneCardList = JSON.parse(JSON.stringify(cardList)).map(card => CardInformation.parseCardInfo(card));
        this.cardList = this.arrangeNonReviewCardsFirst(cloneCardList);
        this.enableUI();
      });
  }
  makeRequest() {
    let userId: String = this.gUserService.getUserEmail();
    let reviewDayCount = this.reviewDayCount;
    return { userId, reviewDayCount };
  }

  updateAllCardReviewResult() {
    this.disableUI();
    var userInfo: UserInformation = new UserInformation();
    userInfo.userId = this.gUserService.getUserEmail();
    userInfo.reviewDayCount = this.reviewDayCount || this.gUserService.getReviewDayCount();

    this.dataService.requestUpdatingAllCardReviewResult(userInfo)
      .subscribe(data => {
        this.roadCards();
      });
  }

  suffleCards() {
    this.cardList = this.arrangeNonReviewCardsFirst(this.shuffle(this.cardList));
  }

  private disableUI() {
    this.isUpdatingResult = true;
  }
  private enableUI() {
    this.isUpdatingResult = false;
  }
  private changeCardType(newCardType: number) {
    this.cardList = this.arrangeNonReviewCardsFirst(this.filterCardList(newCardType));
  }
  private filterCardList(cardType: number): CardInformation[] {
    return this.cardListDB.filter(card => card.isMatchedCardType(cardType));
  }
  /**
   * 복습 안한 카드를 앞쪽으로 배치
   * @param {Array<CardInformation>} cardList 
   * @return {Array<CardInformation>}
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