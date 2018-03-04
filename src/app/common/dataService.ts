import { Http } from "@angular/http";
import UserInput from "../data-model/UserInput";
import { Injectable } from "@angular/core";

@Injectable()
export default class DataService {
  constructor(private http: Http) {
  }

  public addNewCard(userInput: UserInput) {
    console.log('addNewCard ', userInput);
    this.http.post('http://localhost:8000/card', userInput)
    .subscribe(results => console.log(results));
  }
}