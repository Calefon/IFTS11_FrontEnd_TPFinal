import { Component, EventEmitter, Input, Output } from '@angular/core';
import ICard from '../../../models/card.model';
import { CardApiService } from '../../../services/card-api.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'boton-crear-component',
  imports: [TranslocoModule],
  templateUrl: './boton-crear-card.component.html',
  styleUrl: './boton-crear-card.component.css'
})
export class BotonCrearCardComponent {
  @Input() listId!: string;
  @Output() cardCreated = new EventEmitter<void>();

  showModal = false;
  title = '';
  description = '';

  titlePlaceholder = 'table.cards.title';
  descriptionPlaceholder = 'table.cards.description';

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
