// layout.ts
import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Header } from '../shared/components/header/header';
import { Home } from '../pages/home/home';
import { About } from '../pages/about/about';
import { Contact } from '../pages/contact/contact';
import { Expertise } from '../pages/expertise/expertise';
import { Careers } from "../pages/careers/careers";
import { CommonModule } from '@angular/common';
import { Footer } from '../shared/components/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
  imports: [Header, Home, About, Contact, Expertise, Careers, RouterModule, CommonModule, Footer]
})
export class Layout implements AfterViewInit {
sectionVisibility:any = {
    home: false,
    expertise: false,
    about: false,
    contact: false,
    careers: false
  };

  @ViewChildren('section') sectionRefs!: QueryList<ElementRef>;

  constructor(private router: Router) {}

ngAfterViewInit() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            const id = entry.target.getAttribute('id');
            // You can add animation trigger logic here if needed
          }
        },
        {
          rootMargin: '0px 0px -200px 0px',
          threshold: 0.1
        }
      );

      this.sectionRefs.forEach(el => observer.observe(el.nativeElement));
    }

    // Scroll after view init (to handle page reloads directly to route)
    setTimeout(() => {
      let sectionId = this.router.url.replace('/', '');
      if (!ids.includes(sectionId)) {
        // If invalid, redirect to home route
        sectionId = 'home';
        this.router.navigate(['/home']);  // This will update the URL to /home
      }
      const el = typeof document !== 'undefined' ? document.getElementById(sectionId) : null;

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 100);

    // Scroll when navigating
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const sectionId = event.urlAfterRedirects.replace('/', '');
        const el = typeof document !== 'undefined' ? document.getElementById(sectionId) : null;
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }
    });
  }
}

const ids = ['home','about','careers','contact','expertise'];

