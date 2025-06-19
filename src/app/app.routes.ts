import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'table',
    loadComponent: () => import('./features/table-page/table-page.component')
  },
  // {
  //   path: 'sticky',
  //   loadComponent: () => import('./features/sticky-page/sticky-page.component')
  // },
  {
    path: '**',
    redirectTo: 'table',
  },
];
