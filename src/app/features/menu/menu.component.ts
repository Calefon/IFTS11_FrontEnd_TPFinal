import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../../services/language.service';

interface MenuOption {
  label: string;
  sublabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-menu-component',
  imports: [RouterLink, RouterLinkActive, TranslocoModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  // themeService = inject(ThemeService);
  languageService = inject(LanguageService);

  menuOptions: MenuOption[] = [
    {
      label: 'menu.home.title',
      sublabel: 'menu.home.description',
      route: '/home',
      icon: 'fa-solid fa-house',
    },
    {
      label: 'menu.table.title',
      sublabel: 'menu.table.description',
      route: '/table',
      icon: 'fa-solid fa-table',
    },
    {
      label: 'menu.sticky.title',
      sublabel: 'menu.sticky.description',
      route: '/sticky',
      icon: 'fa-solid fa-note-sticky',
    },
  ];

  // onToggleTheme(): void {
  //   this.themeService.toggleTheme();
  // }

  onToggleLanguage() {
    this.languageService.onToggleLanguage();
  }
}
