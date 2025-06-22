import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Sticky } from '../models/sticky.model';

@Injectable({
  providedIn: 'root'
})
export class StickiesApiService {
  private _stickiesApiURL = environment.API_STICKIES_URL;
  private _http = inject(HttpClient);

  constructor() { }

  getAllStickies(){
    let reqURL = this._stickiesApiURL + '/all';
    return this._http.get<Sticky[]>(reqURL);
  }

  createNewSticky(newSticky : Sticky){
    let reqURL = this._stickiesApiURL + '/new';
    return this._http.post<Sticky>(reqURL, newSticky);
  }

  deleteSticky(stickyId : string){
    let reqURL = `${this._stickiesApiURL}/new/${stickyId}`
    return this._http.delete<Sticky>(reqURL);
  }
}
