import { Component, EventEmitter, Input, Output } from '@angular/core';
import ICard from '../../../models/card.model';
import { CardApiService } from '../../../services/card-api.service';

@Component({
  selector: 'boton-crear-component',
  templateUrl: './boton-crear-card.component.html',
  styleUrl: './boton-crear-card.component.css'
})
export class BotonCrearCardComponent {
  @Input() listId!: string;
  @Output() cardCreated = new EventEmitter<void>();

  showModal = false;
  title = '';
  description = '';

  constructor(private cardApiService: CardApiService) {}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.title = '';
    this.description = '';
  }

  createCard() {
    if (this.title.trim()) {
      const card = {
        title: this.title.trim(),
        description: this.description.trim()
      };

      this.cardApiService.createNewCard(card, this.listId).subscribe({
        next: () => {
          this.cardCreated.emit();
          this.closeModal();
        },
        error: (err) => console.error('Error creando card', err)
      });
    }
  }
}
