import { AfterViewInit, Component, ElementRef, signal } from '@angular/core';
import { contactCardDetail } from '../../shared/utils/data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {
  isVisible = signal(false);

  contactInfo = contactCardDetail;
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
