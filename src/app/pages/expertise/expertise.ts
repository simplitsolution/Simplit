import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-expertise',
  imports: [CommonModule],
  templateUrl: './expertise.html',
  styleUrl: './expertise.scss'
})
export class Expertise {
  serviceCards = [
    {
      title: 'CMS Development',
      description: 'Tailored Drupal and WordPress solutions, crafting powerful, user-friendly websites for an impactful online presence.',
      image: 'assets/images/cms-icon.svg',
      alt: 'CMS Icon',
      link: '#'
    },
    {
      title: 'MVP Development',
      description: 'Empowering startups with scalable MVPs for rapid market entry using advanced tech.',
      image: 'assets/images/MVP-development-service-icon.svg',
      alt: 'MVP Icon',
      link: '#'
    },
    {
      title: 'Data and Analytics',
      description: 'Transform raw data into actionable insights with our Data & Analytics services.',
      image: 'assets/images/web-development.svg',
      alt: 'Analytics Icon',
      link: '#'
    }
  ];
}
