import { Component, ElementRef, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './expertise.html',
  styleUrl: './expertise.scss'
})
export class Expertise implements AfterViewInit {
  isVisible = signal(false);

 serviceCards = [
  {
    title: 'Mobile App Development',
    icon: '../../../assets/images/mobile-development.svg',
    sections: [
      {
        heading: 'Native App Development',
        items: ['iOS Application Development', 'Android Application Development', 'Tizen Application Development']
      },
      {
        heading: 'Hybrid App Development',
        items: ['Flutter Application Development', 'React Native Application Development']
      }
    ],
    link: '#',
  },
  {
    title: 'Web Development',
    icon: '../../../assets/images/web-development.svg',
    sections: [
      {
        heading: 'Backend Development',
        items: ['Node JS, Mongo-DB', 'Java Web Development', 'PHP/Laravel, MySQL']
      },
      {
        heading: 'Front End Development',
        items: ['HTML/CSS/JavaScript', 'Angular, React, Vue']
      }
    ],
    link: '#',
  },
  {
    title: 'SEO & Digital Marketing',
    icon: '../../../assets/images/MVP-development-service-icon.svg',
    sections: [
      {
        heading: 'SEO',
        items: ['On Page SEO', 'Off Page SEO', 'Website Optimization']
      },
      {
        heading: 'Digital Marketing',
        items: ['Social Media Marketing', 'Blog Submission']
      }
    ],
    link: '#'
  }
];



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
