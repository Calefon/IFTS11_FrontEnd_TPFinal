import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardList } from './table-page.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private listsSubject = new BehaviorSubject<CardList[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private addingListSubject = new BehaviorSubject<boolean>(false);

  // Observables públicos
  lists$ = this.listsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  addingList$ = this.addingListSubject.asObservable();

  // Métodos para actualizar el estado
  updateLists(lists: CardList[]) {
    this.listsSubject.next(lists);
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  setAddingList(adding: boolean) {
    this.addingListSubject.next(adding);
  }

  // Métodos para obtener el estado actual
  getCurrentLists(): CardList[] {
    return this.listsSubject.value;
  }

  getCurrentLoading(): boolean {
    return this.loadingSubject.value;
  }

  getCurrentAddingList(): boolean {
    return this.addingListSubject.value;
  }
} 