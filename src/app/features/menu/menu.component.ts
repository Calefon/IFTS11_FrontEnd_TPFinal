import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  label: string;
  sublabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-menu-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
})

export class MenuComponent {
  menuOptions: MenuOption[] = [
    {
      label: 'Home',
      sublabel: 'Navigate to the home page of the application',
      route: '/home',
      icon: 'fa-solid fa-house'
    },
    {
      label: 'Table',
      sublabel: 'View and manage your data in a table format',
      route: '/table',
      icon: 'fa-solid fa-table'
    },
    {
      label: 'Sticky notes',
      sublabel: 'Create and manage your sticky notes',
      route: '/sticky',
      icon: 'fa-solid fa-note-sticky'
    }
  ];
}
