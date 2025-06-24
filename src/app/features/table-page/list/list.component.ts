import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardList, CreateListRequest } from '../table-page.service';

@Component({
  selector: 'app-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './list.component.html',
  standalone: true
})
export class ListComponent {
  @Input() lists: CardList[] = [];
  @Input() loading: boolean = false;
  @Input() addingList: boolean = false;
  
  @Output() createList = new EventEmitter<CreateListRequest>();
  
  newListTitle: string = '';

  onAddNewList() {
    if (this.newListTitle && this.newListTitle.trim()) {
      const request: CreateListRequest = {
        title: this.newListTitle.trim()
      };

      this.createList.emit(request);
      
      // Limpiar campo después de enviar
      this.newListTitle = '';
    } else {
      alert('Por favor completa el título de la lista');
    }
  }
} 