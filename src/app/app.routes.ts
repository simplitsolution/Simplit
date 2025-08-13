import { Routes } from '@angular/router';
import { Expertisedetail } from './pages/expertise/expertisedetail/expertisedetail';

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
  { path: 'services/:type', component: Expertisedetail },
];
