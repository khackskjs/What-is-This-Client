import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'card-type-dropdown',
  templateUrl: './card-type-dropdown.component.html',
  styleUrls: ['./card-type-dropdown.component.css']
})
export class CardTypeDropdownComponent implements OnInit {
  ALL: number = -1;
  EMPTY: number = -2;
  
  @Input() buttonTitle: string;
  @Input() cardTypeNameList: Array<string>;          // user가 지정한 card 종류 이름
  @Input() cardType: number;                // cardInfo.cardType 에 대응하는 값
  @Output() cardTypeChange = new EventEmitter<number>();
  cardTypes: Array<boolean> = [];  // 나중에 각 자리를 리용해서 bitwise 연산해서, cardInfo.cardType 에 대응할 것
  cardTypeEmpty: number;
  cardTypeAll: number;
  cardTypeString: string;
  constructor() {
  }

  ngOnInit() {
    this.cardTypeEmpty = 0;
    this.cardTypeAll = Math.pow(2, this.cardTypeNameList.length) - 1;
    this.cardTypeNameList.forEach(t => this.cardTypes.push(false));
    this.selectCardType(0);
  }

  private selectCardType(idx: number) {
    if (idx === this.ALL) {
      _.forEach(this.cardTypes, (ct, i) => this.cardTypes[i] = true);
      this.cardType = this.cardTypeAll;
    }
    else if(idx === this.EMPTY) {
      _.forEach(this.cardTypes, (ct, i) => this.cardTypes[i] = false);
      this.cardType = this.cardTypeEmpty;
    }
    else {
      this.cardTypes[idx] = !this.cardTypes[idx];
      this.cardType ^= 1 << idx;
    }

    this.cardTypeString = this.cardType === this.cardTypeAll ? 'ALL' : this.cardTypeNameList.filter((val, idx) => this.cardTypes[idx]).join(', ');
    this.cardTypeChange.emit(this.cardType);
  }
}