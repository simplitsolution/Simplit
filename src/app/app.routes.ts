import { Routes } from '@angular/router';

export const routes: Routes = [
 {
  path:'',
   loadComponent: ()=>
      import('./layout/layout').then(c => c.Layout),
    children:[
       { path: 'home', loadComponent: ()=> import('./pages/home/home').then(c => c.Home) },
       { path: 'about', loadComponent: ()=> import('./pages/about/about').then(c => c.About) },
       { path: 'expertise', loadComponent: ()=> import('./pages/expertise/expertise').then(c => c.Expertise) },
       { path: 'contact', loadComponent: ()=> import('./pages/contact/contact').then(c => c.Contact) },
       { path: 'careers', loadComponent: ()=> import('./pages/careers/careers').then(c => c.Careers) }
    ]
 }
];
