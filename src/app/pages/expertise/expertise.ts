import { Component, ElementRef, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { serviceCardsDetail } from '../../shared/utils/data';

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './expertise.html',
  styleUrl: './expertise.scss'
})
export class Expertise implements AfterViewInit {
  isVisible = signal(false);

 serviceCards = serviceCardsDetail;
 constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            this.isVisible.set(entry.isIntersecting);
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(this.el.nativeElement);
    }
  }
}
