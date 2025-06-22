import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ISticky } from '../models/sticky.model';

@Injectable({
  providedIn: 'root'
})
export class StickiesApiService {
  private _stickiesApiURL = environment.API_STICKIES_URL;
  private _http = inject(HttpClient);

  constructor() { }

  getAllStickies(){
    let reqURL = this._stickiesApiURL + '/all';
    return this._http.get<ISticky[]>(reqURL);
  }

  createNewSticky(newSticky : {titulo : string, contenido: string}){
    let reqURL = this._stickiesApiURL + '/new';
    return this._http.post<ISticky>(reqURL, newSticky);
  }

  deleteSticky(stickyId : string){
    let reqURL = `${this._stickiesApiURL}/delete/${stickyId}`
    return this._http.delete<ISticky>(reqURL);
  }
}
