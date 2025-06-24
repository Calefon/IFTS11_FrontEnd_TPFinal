import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home-page/home-page.component')
  },
  {
    path: 'table',
    loadComponent: () => import('./features/table-page/table-page.component')
  },
  {
    path: 'sticky',
    loadComponent: () => import('./features/stickies/container/stickies-container.component').then(m => m.StickiesContainerComponent)
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
