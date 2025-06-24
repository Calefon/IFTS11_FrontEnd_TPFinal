import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface CardList {
  _id?: string;
  title: string;
}

export interface CreateListRequest {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class TablePageService {
  private baseUrl = 'http://127.0.0.1:8080/api/cards';

  constructor(private http: HttpClient) { }

  // Obtener todas las listas
  getLists(): Observable<CardList[]> {
    return this.http.get<CardList[]>(`${this.baseUrl}/lists`);
  }

  // Crear una nueva lista
  createList(request: CreateListRequest): Observable<CardList> {
    console.log('Service: Creating list with request:', request);
    console.log('Service: URL:', `${this.baseUrl}/lists`);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    return this.http.post<CardList>(`${this.baseUrl}/lists`, request, { headers });
  }


} 