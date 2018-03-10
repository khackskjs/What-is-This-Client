import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import * as _ from 'underscore';

import CardInformation from "../data-model/CardInformation";

const SERVER_URL = 'http://localhost:8000';

@Injectable()
export default class DataService {
  constructor(private http: HttpClient) {
  }

  public addNewCard(cardInfo: CardInformation) {
    console.log('addNewCard ', cardInfo);
    return this.http.post(`${SERVER_URL}/card`, cardInfo);
      // .subscribe(results => console.log(results));
  }

  /**
   * 
   * @param {Object} params 
   * @param {String} params.userId
   * @param {Number} params.reviewDayCount
   */
  public getCards(params) {
    return this.http.get(`${SERVER_URL}/card`, { params: params })
      .map((cardListObject:any) => {
        let cardList = Array<CardInformation>();
        _.forEach(cardListObject, (card) => {
          cardList.push((CardInformation.parseCardInfo(card)));
        });
        return cardList;
      });
      // .subscribe(results => {console.log('getCards', results);});
  }
}