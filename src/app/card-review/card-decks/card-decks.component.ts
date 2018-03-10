import { Component, OnInit, Input, SimpleChanges, HostListener } from '@angular/core';
import CardInformation from '../../data-model/CardInformation';

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
  currentCard: CardInformation;
  showCard: Boolean = false;
  // isFlipped = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    
    switch(event.keyCode) {
      case KEY_CODE.UP_ARROW:
        this.changeCardShowingStatust(true);
        break;
      
      case KEY_CODE.DOWN_ARROW:
        this.showCard ? this.nextCard() : this.changeCardShowingStatust(true);
        break;

      case KEY_CODE.RIGHT_ARROW:
        
        this.nextCard();
        
        break;
      
      case KEY_CODE.LEFT_ARROW:
        this.prevCard();
        break;
    }
    event.stopPropagation();
  }

  constructor() {
    this.currentCard = new CardInformation();
  }

  setCurrentCardIndex(index: number) {
    this.currentCardIndex = this.cardList.length === 0 ? null : index;
    this.currentCard = this.cardList[this.currentCardIndex];
  }

  ngOnInit() {}

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
  /**
   * 최초 카드가 아닐 경우, 다음 카드를 보여준다.
   */
  private prevCard() {
    let ccIdx = this.currentCardIndex;
    this.currentCardIndex = ccIdx > 0 ? ccIdx - 1 : ccIdx;
    this.showCard = false; 
  }
}