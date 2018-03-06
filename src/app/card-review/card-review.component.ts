import { Component, OnInit } from '@angular/core';
import DataService from '../common/dataService';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.component.html',
  styleUrls: ['./card-review.component.css']
})
export class CardReviewComponent implements OnInit {
  cardType = {};

  constructor(dataService:DataService) {
    console.log('card-review constructor');
    dataService.getCards({ userId: 'kjs' });
  }

  ngOnInit() {
    console.log('card-review ngOnInit');
  }

}
