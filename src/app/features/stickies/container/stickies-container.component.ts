import { Component, inject, OnInit } from '@angular/core';
import { StickiesApiService } from '../../../services/stickies-api.service';
import { ISticky } from '../../../models/sticky.model';
import { StickyComponent } from '../sticky/sticky.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stickies-container',
  imports: [StickyComponent, CommonModule],
  templateUrl: './stickies-container.component.html',
  styleUrl: './stickies-container.component.css'
})
export class StickiesContainerComponent implements OnInit {
  private _stickiesApiService = inject(StickiesApiService);
  public stickyList : ISticky[] = [];
  public isLoading : boolean = true;

  ngOnInit(): void {
    this._stickiesApiService.getAllStickies().subscribe(
      {
        next: (stickies) => {
          this.stickyList = stickies;
          this.isLoading = false;
        },
        error: error => console.error(error)
      }
    );
  }


}
