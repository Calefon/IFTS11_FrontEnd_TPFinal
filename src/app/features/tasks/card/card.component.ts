import { Component, Input, OnInit } from '@angular/core';
import ICardApi from '../../../models/card-api.model';
import { CardApiService } from '../../../services/card-api.service';
import { BotonCrearCardComponent } from '../boton-crear-card/boton-crear-card.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  imports: [BotonCrearCardComponent, TranslocoModule],
})
export default class CardComponent implements OnInit {
  @Input() listId!: string;
  listCards: ICardApi[] = [];

  constructor(private cardApiService: CardApiService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  deleteCard(listId: String, cardId: String) {
    this.cardApiService.deleteCard(listId, cardId).subscribe({
      next: () => {
        this.listCards = this.listCards.filter(card => card._id !== cardId);
      },
      error: (err) => {
        console.error(`Error eliminando card ${cardId} de la lista ${listId}`, err);
      }
    });
  }

  loadCards() {
   if (this.listId) {
      this.cardApiService.getAllCardsList(this.listId).subscribe({
        next: (cards) => this.listCards = cards,
        error: (err) => console.error(`Error cargando cards de la lista ${this.listId}`, err)
      });
    }
  }
}
