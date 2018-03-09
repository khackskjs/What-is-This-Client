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
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'kjs';
      localStorage.setItem('userId', 'kjs');
    }
    
    dataService.getCards({ userId: userId })
      .subscribe(data => console.log(data));
  }

  ngOnInit() {
    console.log('card-review ngOnInit');
  }

}
