import { Component, OnInit, Input, SimpleChanges, HostListener } from '@angular/core';
import { CardInformation, CARD_COLOR, REVIEW_RESULT } from '../../data-model/CardInformation';

export enum KEY_CODE {
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40,
}

@Component({
  selector: 'card-decks',
  templateUrl: './card-decks.component.html',
  styleUrls: ['./card-decks.component.css']
})
export class CardDecksComponent implements OnInit {
  @Input() cardList: Array<CardInformation>;  
  currentCardIndex: number = 0;
  // currentCard: CardInformation;
  showCard: Boolean = false;
  // cardBackBgColor: CARD_COLOR = CARD_COLOR.NONE;
  previousKey;
  // isFlipped = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.key)
    switch(event.keyCode) {
      case KEY_CODE.UP_ARROW:
        if (this.previousKey === KEY_CODE.DOWN_ARROW) {
          this.showCard ? this.setCardNoneReview() : this.passCardReview();
        }
        else if (this.previousKey === KEY_CODE.UP_ARROW) {
          this.showCard ? this.nextCard() : this.passCardReview();
        }
        else {
          this.passCardReview();
        }
        break;
      
      case KEY_CODE.DOWN_ARROW:
        if (this.previousKey === KEY_CODE.UP_ARROW) {
          // key down -> up: 원래 상태로 돌아감
          this.showCard ? this.setCardNoneReview() : this.failCardReview();
        }
        else if (this.previousKey === KEY_CODE.DOWN_ARROW) {
          // key down -> down:
          this.showCard ? this.nextCard() : this.failCardReview();
        }
        else {
          this.failCardReview();
        }
        break;

      case KEY_CODE.RIGHT_ARROW:
        this.nextCard();
        break;
      
      case KEY_CODE.LEFT_ARROW:
        this.prevCard();
        break;
    }
    this.previousKey = event.keyCode;
    event.stopImmediatePropagation();
  }

  

  passCardReview() {
    this.changeCardShowingStatust(true);
    let currentCard = this.getCurrentCard();
    currentCard.reviewResult = REVIEW_RESULT.PASS;
    // this.cardBackBgColor = CARD_COLOR.PASS;
  }
  failCardReview() {
    this.changeCardShowingStatust(true);
    let currentCard = this.getCurrentCard();
    currentCard.reviewResult = REVIEW_RESULT.FAIL;
  }
  /**
   *  review 하기 전 상태로 바꿈
   */
  setCardNoneReview() {
    this.changeCardShowingStatust(false);
  }

  constructor() {
    // this.currentCard = new CardInformation();
  }

  setCurrentCardIndex(index: number) {
    this.currentCardIndex = this.cardList.length === 0 ? null : index;
    // this.currentCard = this.cardList[this.currentCardIndex];
  }

  ngOnInit() {}

  reviewCard(badgeType) {
    let currentCard = this.getCurrentCard(),
        retVal = false;

    retVal =  badgeType === 'pass' && currentCard.reviewResult === REVIEW_RESULT.PASS ? true :
              badgeType === 'fail' && currentCard.reviewResult === REVIEW_RESULT.FAIL ? true : false;

    return retVal;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.cardList || this.cardList.length === 0)
      return;
    
    this.setCurrentCardIndex(0);
  }
  private changeCardShowingStatust(status: Boolean) {
    this.showCard = status;
  }
  /**
   * 마지막이 아닐 경우, 다음 카드를 보여준다.
   */
  private nextCard() {
    // this.cardBackBgColor = CARD_COLOR.NONE;
    let ccIdx = this.currentCardIndex;
    this.currentCardIndex = ccIdx >= this.cardList.length - 1 ? ccIdx : ccIdx + 1;
    this.showCard = false;
  }
  /**
   * 최초 카드가 아닐 경우, 다음 카드를 보여준다.
   */
  private prevCard() {
    let ccIdx = this.currentCardIndex;
    this.currentCardIndex = ccIdx > 0 ? ccIdx - 1 : ccIdx;
    this.showCard = false; 
  }
  private getCurrentCard() {
    return this.cardList[this.currentCardIndex];
  }
}