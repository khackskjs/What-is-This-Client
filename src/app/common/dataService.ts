import { Http } from "@angular/http";
import UserInput from "../data-model/UserInput";
import { Injectable } from "@angular/core";

const SERVER_URL = 'http://localhost:8000';

@Injectable()
export default class DataService {
  constructor(private http: Http) {
  }

  public addNewCard(userInput: UserInput) {
    console.log('addNewCard ', userInput);
    this.http.post(`${SERVER_URL}/card`, userInput)
      .subscribe(results => console.log(results));
  }

  public getCards(params) {
    console.log('getCards')
    this.http.get(`${SERVER_URL}/card`, { params: params })
      .subscribe(results => {console.log('getCards', results);});
  }
}