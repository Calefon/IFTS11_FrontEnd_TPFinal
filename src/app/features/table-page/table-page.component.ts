import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import CardComponent from '../tasks/card/card.component';
import {
  TablePageService,
  CardList,
  CreateListRequest,
} from '../../services/table-page.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-table-page-component',
  imports: [FormsModule, CommonModule, TranslocoModule, CardComponent],
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
      },
    });
  }

  addNewList() {
    console.log('addNewList called');
    console.log('newListTitle:', this.newListTitle);

    if (this.newListTitle && this.newListTitle.trim()) {
      this.addingList = true;
      const request: CreateListRequest = {
        title: this.newListTitle.trim(),
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
          console.error(
            'Error details:',
            error.status,
            error.statusText,
            error.message
          );
          this.addingList = false;
        },
      });
    } else {
      console.log(
        'Validation failed - newListTitle:',
        this.newListTitle,
        'newCardTitle:',
        this.newCardTitle
      );
      alert('Por favor completa ambos campos');
    }
  }

  updateList(id?: any) {
    //abre un modal o ventana para editar la lista
    console.log('updateList called with id:', id);
    const newTitle = prompt('Enter new title for the list:');
    if (newTitle && newTitle.trim()) {
      this.tablePageService.updateList(id, newTitle.trim()).subscribe({
        next: () => {
          console.log('List updated successfully');
          this.loadLists();
        },
        error: (error) => {
          console.error('Error updating list:', error);
        },
      });
    } else {
      alert('Please enter a valid title');
    }
  }

  deleteList(id?: any) {
    this.tablePageService.deleteList(id).subscribe({
      next: () => {
        console.log('List deleted successfully');
        this.loadLists();
      },
    });
  }
}
