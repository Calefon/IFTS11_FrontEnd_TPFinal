import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sticky',
  imports: [],
  templateUrl: './sticky.component.html'
})
export class StickyComponent {
  @Input() titulo: string = '';
  @Input() contenido: string = '';
}
