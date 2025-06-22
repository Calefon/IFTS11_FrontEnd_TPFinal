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
    this.getAllStickies();
  }

  //Necesario declararla asi para que funcione el pasarlo como Input a Sticky
  public deleteSticky = (id : string):void => {

    this._stickiesApiService.deleteSticky(id).subscribe(
      {
        next: (stickyBorrada) => {
          console.info(`Nota borrada: ${JSON.stringify(stickyBorrada)}`);
          this.getAllStickies();
        },
        error: error => console.error(error)
      }
    );
  }

  getAllStickies():void{
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

  createSticky(){
    const titulo = prompt("Ingrese el título de la nueva nota");
    if(!titulo || titulo.length == 0){
      alert("Debe indicar un título");
      return;
    }else if( titulo.length > 100){
      alert("Elija un título más corto (máx. 100 caracteres)");
      return;
    }
    let contenido = prompt("Ingrese el contenido de la nueva nota");
    if(!contenido){
      contenido = "";
    }
    this._stickiesApiService.createNewSticky({titulo, contenido}).subscribe(
      {
        next: () => {
          this.getAllStickies();
        },
        error: error => console.error(error)
      }
    );
  }


}
