import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePageService, CardList, CreateListRequest } from './table-page.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-table-page-component',
  imports: [CommonModule, ListComponent],
  templateUrl: './table-page.component.html',
})
export default class TablePageComponentComponent implements OnInit {
  
  lists: CardList[] = [];
  loading: boolean = false;
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

  onCreateList(request: CreateListRequest) {
    console.log('Creating list with request:', request);
    
    this.addingList = true;
    this.tablePageService.createList(request).subscribe({
      next: (newList) => {
        console.log('List created successfully:', newList);
        this.loadLists();
        this.addingList = false;
      },
      error: (error) => {
        console.error('Error creating list:', error);
        console.error('Error details:', error.status, error.statusText, error.message);
        this.addingList = false;
      }
    });
  }
}
