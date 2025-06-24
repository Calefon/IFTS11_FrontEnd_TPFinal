import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TablePageService, CardList, CreateListRequest, } from './table-page.service';

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
          console.error('Error details:', error.status, error.statusText, error.message);
          this.addingList = false;
        }
      });
    } else {
      console.log('Validation failed - newListTitle:', this.newListTitle, 'newCardTitle:', this.newCardTitle);
      alert('Por favor completa ambos campos');
    }
  }

}
