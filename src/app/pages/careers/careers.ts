import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { perks } from '../../shared/utils/data';

@Component({
  selector: 'app-careers',
  imports: [CommonModule,RouterModule],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
  animations: [
    trigger('perkAnimation', [
      transition('false => true', [
        query('.perk-card', [
          style({ opacity: 0, transform: 'translateY(40px)' }),
          stagger(800, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Careers {
   isVisible = signal(false);
   perkList = perks;
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
