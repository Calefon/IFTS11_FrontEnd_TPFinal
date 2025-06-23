import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Card {
  _id?: string;
  title: string;
  description?: string;
}

export interface CardList {
  _id?: string;
  title: string;
  cards: Card[];
  newCardTitle?: string;
}

export interface CreateListRequest {
  title: string;
  card?: {
    title: string;
    description?: string;
  };
}

export interface CreateCardRequest {
  title: string;
  description?: string;
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

  // Actualizar una lista
  updateList(listId: string, title: string): Observable<CardList> {
    return this.http.put<CardList>(`${this.baseUrl}/lists/${listId}`, { title });
  }

  // Eliminar una lista
  deleteList(listId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/lists/${listId}`);
  }

  // Crear una nueva tarjeta
  createCard(listId: string, request: CreateCardRequest): Observable<Card> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post<Card>(`${this.baseUrl}/lists/${listId}/cards`, request, { headers });
  }

  // Actualizar una tarjeta
  updateCard(listId: string, cardId: string, request: CreateCardRequest): Observable<Card> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.put<Card>(`${this.baseUrl}/lists/${listId}/cards/${cardId}`, request, { headers });
  }

  // Eliminar una tarjeta
  deleteCard(listId: string, cardId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/lists/${listId}/cards/${cardId}`);
  }
} 