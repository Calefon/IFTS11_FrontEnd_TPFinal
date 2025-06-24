import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { TablePageService } from '../../services/table-page.service';
import { StickiesApiService } from '../../services/stickies-api.service';

@Component({
  selector: 'app-home-page',
  imports: [TranslocoModule, TranslocoModule],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {
  tablePageService = inject(TablePageService);
  stickyPageService = inject(StickiesApiService)
  listsAmount = signal<number>(0);
  notesAmount = signal<number>(0);

  constructor(){
    this.loadLists();
    this.loadNotes();
  }

  loadLists() {
    this.tablePageService.getLists().subscribe({
      next: (lists) => {
        this.listsAmount.set(lists.length);
      },
      error: (error) => {
        console.error('Error loading lists:', error);
      },
    });
  }

  loadNotes() {
    this.stickyPageService.getAllStickies().subscribe({
      next: (notes) => {
        this.notesAmount.set(notes.length);
      },
      error: (error) => {
        console.error('Error loading lists:', error);
      },
    });
  }
}
