import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TablePageService, CardList, Card, CreateListRequest, CreateCardRequest } from './table-page.service';

@Component({
  selector: 'app-table-page-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './table-page.component.html',
})
export default class TablePageComponentComponent implements OnInit {
  
  lists: CardList[] = [];
  newListTitle: string = '';
  newCardTitle: string = '';
  loading: boolean = false;
  addingCard: boolean = false;
  addingList: boolean = false;

  constructor(private tablePageService: TablePageService) {}

  ngOnInit() {
    this.loadLists();
  }

  loadLists() {
    this.loading = true;
    this.tablePageService.getLists().subscribe({
      next: (lists) => {
        this.lists = lists;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading lists:', error);
        this.loading = false;
      }
    });
  }

  addNewList() {
    console.log('addNewList called');
    console.log('newListTitle:', this.newListTitle);
    console.log('newCardTitle:', this.newCardTitle);
    
    if (this.newListTitle && this.newListTitle.trim() && this.newCardTitle && this.newCardTitle.trim()) {
      this.addingList = true;
      const request: CreateListRequest = {
        title: this.newListTitle.trim(),
        card: {
          title: this.newCardTitle.trim()
        }
      };

      console.log('Sending request to create list:', request);

      this.tablePageService.createList(request).subscribe({
        next: (newList) => {
          console.log('List created successfully:', newList);
          // Recargar la lista completa para evitar problemas de duplicados
          this.loadLists();
          this.newListTitle = '';
          this.newCardTitle = '';
          this.addingList = false;
        },
        error: (error) => {
          console.error('Error creating list:', error);
          console.error('Error details:', error.status, error.statusText, error.message);
          this.addingList = false;
        }
      });
    } else {
      console.log('Validation failed - newListTitle:', this.newListTitle, 'newCardTitle:', this.newCardTitle);
      alert('Por favor completa ambos campos');
    }
  }

  addCardToList(list: CardList) {
    if (list.newCardTitle && list.newCardTitle.trim() && list._id) {
      this.addingCard = true;
      const request: CreateCardRequest = {
        title: list.newCardTitle.trim()
      };

      console.log('Adding card to list:', list._id, 'with title:', request.title);

      this.tablePageService.createCard(list._id, request).subscribe({
        next: (newCard) => {
          console.log('Card created successfully:', newCard);
          // Recargar la lista completa para evitar problemas de duplicados
          this.loadLists();
          list.newCardTitle = '';
          this.addingCard = false;
        },
        error: (error) => {
          console.error('Error creating card:', error);
          console.error('Error details:', error.status, error.statusText, error.message);
          this.addingCard = false;
        }
      });
    } else {
      console.log('Validation failed for adding card');
    }
  }

  deleteCard(list: CardList, cardId: string) {
    if (list._id) {
      this.tablePageService.deleteCard(list._id, cardId).subscribe({
        next: () => {
          const cardIndex = list.cards.findIndex(card => card._id === cardId);
          if (cardIndex !== -1) {
            list.cards.splice(cardIndex, 1);
          }
        },
        error: (error) => {
          console.error('Error deleting card:', error);
        }
      });
    }
  }

  onKeyPress(event: KeyboardEvent, list: CardList) {
    if (event.key === 'Enter') {
      this.addCardToList(list);
    }
  }
}
