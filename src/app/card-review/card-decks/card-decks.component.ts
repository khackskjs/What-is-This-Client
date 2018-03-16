import { Component, OnInit, Input, SimpleChanges, HostListener } from '@angular/core';
import { CardInformation, CARD_COLOR, REVIEW_RESULT } from '../../data-model/CardInformation';
import DataService from '../../common/dataService';
import UserService from '../../common/userService';

export enum KEY_CODE {
  SPACE_BAR = 32,
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
  showCard: Boolean = false;
  previousKey: KEY_CODE;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event.keyCode);
    switch(event.keyCode) {
      case KEY_CODE.UP_ARROW:
        this.showCard && this.previousKey === KEY_CODE.UP_ARROW ? this.nextCard() : this.passCardReview();
        break;
      
      case KEY_CODE.DOWN_ARROW:
        this.showCard && this.previousKey === KEY_CODE.DOWN_ARROW ? this.nextCard() : this.failCardReview();
        break;

      case KEY_CODE.RIGHT_ARROW:
        this.nextCard();
        break;
      
      case KEY_CODE.LEFT_ARROW:
        this.prevCard();
        break;

      case KEY_CODE.SPACE_BAR:
        this.showFrontCard();
        break;
    }
    this.previousKey = event.keyCode;
    event.stopImmediatePropagation();
  }

  ngOnInit() {}
  constructor(private dataService: DataService, private userService: UserService) {}

  passCardReview() {
    this.changeCardShowingStatust(true);
    let currentCard = this.getCurrentCard();
    currentCard.reviewResult = REVIEW_RESULT.PASS;
    this.updateCardReview();
  }
  failCardReview() {
    this.changeCardShowingStatust(true);
    let currentCard = this.getCurrentCard();
    currentCard.reviewResult = REVIEW_RESULT.FAIL;
    this.updateCardReview();
  }
  /**
   *  frontCard를 보여줌
   */
  showFrontCard() {
    this.changeCardShowingStatust(false);
  }

  setCurrentCardIndex(index: number) {
    this.currentCardIndex = this.cardList.length === 0 ? null : index;
  }

  reviewCard(badgeType) {
    let currentCard = this.getCurrentCard(),
        retVal = false;
    let revRes = currentCard.reviewResult;

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
    let ccIdx = this.currentCardIndex;
    this.currentCardIndex = ccIdx >= this.cardList.length - 1 ? ccIdx : ccIdx + 1;
    this.showCard = false;
  }
  private updateCardReview() {
    this.dataService.updateCardReview(this.getCurrentCard()).subscribe();
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