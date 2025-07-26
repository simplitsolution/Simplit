// layout.ts
import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Header } from '../shared/components/header/header';
import { Home } from '../pages/home/home';
import { About } from '../pages/about/about';
import { Contact } from '../pages/contact/contact';
import { Expertise } from '../pages/expertise/expertise';
import { Careers } from "../pages/careers/careers";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
  imports: [Header, Home, About, Contact, Expertise, Careers, RouterModule, CommonModule]
})
export class Layout implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const sectionId = event.urlAfterRedirects.replace('/', '');
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  }
}
