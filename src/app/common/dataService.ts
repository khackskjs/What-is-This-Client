import { CardInformation } from './../data-model/CardInformation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import * as _ from 'underscore';
import UserInformation from '../data-model/UserInformation';

const SERVER_URL = 'http://localhost:8000';

@Injectable()
export default class DataService {
  constructor(private http: HttpClient) {
  }

  public addNewCard(cardInfo: CardInformation) {
    return this.http.post(`${SERVER_URL}/card`, cardInfo);
  }

  public updateCardReview(cardInfo: CardInformation) {
    console.log('updateCard', cardInfo);
    var object = { id: cardInfo.DBID, reviewResult: cardInfo.reviewResult };
    return this.http.put(`${SERVER_URL}/card`, object);
  }
  public requestUpdatingAllCardReviewResult(userInfo: UserInformation) {
    return this.http.post(`${SERVER_URL}/card/update`, userInfo);
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
  }
}