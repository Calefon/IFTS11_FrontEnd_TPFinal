import { Component, inject, OnInit } from '@angular/core';
import { StickiesApiService } from '../../../services/stickies-api.service';
import { Sticky } from '../../../models/sticky.model';

@Component({
  selector: 'app-stickies-container',
  imports: [],
  templateUrl: './stickies-container.component.html',
  styleUrl: './stickies-container.component.css'
})
export class StickiesContainerComponent implements OnInit {
  private _stickiesApiService = inject(StickiesApiService);
  public stickyList : Sticky[] = []

  ngOnInit(): void {
    this._stickiesApiService.getAllStickies().subscribe(
      {
        next: (stickies) => {
          this.stickyList = stickies
        },
        error: error => console.error(error)
      }
    );
  }


}
