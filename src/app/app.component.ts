import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './features/menu/menu.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  themeService = inject(ThemeService);
}
