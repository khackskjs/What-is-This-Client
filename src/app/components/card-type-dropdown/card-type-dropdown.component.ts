import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card-type-dropdown',
  templateUrl: './card-type-dropdown.component.html',
  styleUrls: ['./card-type-dropdown.component.css']
})
export class CardTypeDropdownComponent implements OnInit {
  @Input() buttonTitle: string;
  @Input() cardTypes: Array<boolean> = [];  // 나중에 각 자리를 리용해서 bitwise 연산해서, cardInfo.cardType 에 대응할 것
  @Input() cardTypeNameList: Array<string>;          // user가 지정한 card 종류 이름
  @Input() cardType: number;                // cardInfo.cardType 에 대응하는 값
  @Output() cardTypeChange = new EventEmitter<number>();
  cardTypeString: string;
  constructor() {
  }

  ngOnInit() {
    this.selectCardType(0);
  }

  private selectCardType(idx) {
    this.cardTypes[idx] = !this.cardTypes[idx];
    this.cardTypeString = this.cardTypeNameList.filter((val, idx) => this.cardTypes[idx]).join(', ');
    this.cardType ^= 1 << idx;
    this.cardTypeChange.emit(this.cardType);
    console.log(this.cardType)
  }
}