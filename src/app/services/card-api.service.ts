import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ICardApi from '../models/card-api.model'
import ICard  from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardApiService {
  private cardsApiURL = "http://127.0.0.1:8080";
  private _http = inject(HttpClient);

  constructor() { }

  getAllCardsList(idList:String){
    let reqURL = this.cardsApiURL + `/lists/${idList}/cards`;
    return this._http.get<ICardApi[]>(reqURL)
  }

  createNewCard(card:ICard, idList:String){
    let reqURL = this.cardsApiURL + `/lists/${idList}/cards`;
    return this._http.post<ICardApi>(reqURL, card);
  }

  deleteCard(idList : String, idCard:String){
    let reqURL = `${this.cardsApiURL}/lists/${idList}/cards/${idCard}`
    return this._http.delete<ICardApi>(reqURL);
  }
}
