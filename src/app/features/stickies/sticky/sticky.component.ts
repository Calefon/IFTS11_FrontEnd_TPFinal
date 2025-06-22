import { Component, Input } from '@angular/core';
import { ISticky } from '../../../models/sticky.model';

@Component({
  selector: 'app-sticky',
  imports: [],
  templateUrl: './sticky.component.html'
})
export class StickyComponent {
  @Input() sticky: ISticky = <ISticky>{}
  @Input() clickDeleteHandler: (id:string) => void = (id:string)=>{};
}
