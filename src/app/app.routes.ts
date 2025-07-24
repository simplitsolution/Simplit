import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
 {
  path:'',
   loadComponent: ()=>
      import('./layout/layout').then(c => c.Layout),
    children:[
       { path: 'home', loadComponent: ()=> import('./pages/home/home').then(c => c.Home) }
    ]
 }
];
