import { Injectable, signal } from '@angular/core';
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
  listsAmount = signal<number>(0);

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


  // Editar una lista por ID
  updateList(listId: string, title: string): Observable<void> {
    console.log('Service: Updating list with ID:', listId, 'to title:', title);
    const request = { title: title };
    return this.http.put<void>(`${this.baseUrl}/lists/${listId}`, request);
  }

  // Eliminar una lista por ID
  deleteList(listId: string): Observable<void> {
    console.log('Service: Deleting list with ID:', listId);
    return this.http.delete<void>(`${this.baseUrl}/lists/${listId}`);
  }

}
