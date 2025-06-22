import { Routes } from '@angular/router';

export const routes: Routes = [
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
    redirectTo: 'table',
  },
];
