import { Routes } from '@angular/router';

// app.routes.ts
export const routes: Routes = [
   {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
   },
  {
    path: ':id',
    loadComponent: () => import('./layout/layout').then(c => c.Layout)
  },
];
