import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Header } from '../../../shared/components/header/header';
import { Footer } from "../../../shared/components/footer/footer";

type ServiceType = 'web' | 'mobile' | 'seo';

@Component({
  selector: 'app-expertisedetail',
  standalone: true, // <-- required for imports array
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './expertisedetail.html',
  styleUrls: ['./expertisedetail.scss']
})
export class Expertisedetail implements OnInit {
  title = '';
  subtitle = '';
  description = '';
  features: string[] = [];
  image = '';
  serviceType: ServiceType = 'web';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      if (this.isValidServiceType(type)) {
        this.serviceType = type;
        this.loadContent();
      }
    });
  }

  private isValidServiceType(value: string | null): value is ServiceType {
    return value === 'web' || value === 'mobile' || value === 'seo';
  }

  loadContent() {
    const serviceData: Record<ServiceType, {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      image: string;
    }> = {
      web: {
        title: 'Creating Engaging Digital Experiences with Web Design and Development',
        subtitle: 'Your Vision, Our Code',
        description: `At Aeybit, we bring your online vision to life with cutting-edge web design and development services. Our focus is on delivering websites that are not only aesthetically pleasing but also highly functional and tailored to meet your business goals.`,
        features: [
          'Modern UI/UX Design using Figma, Adobe XD, and Sketch.',
          'Custom Website Development with React, Angular, and Vue.',
          'Backend Solutions using Node.js, Django, Laravel, and Express.'
        ],
        image: 'assets/images/web.png'
      },
      mobile: {
        title: 'Best Mobile App Development Company in Surat, India',
        subtitle: 'Apps that Engage & Perform',
        description: `We craft user-friendly mobile apps from your ideas, enhancing engagement and streamlining processes. Our seasoned experts deliver scalable and intuitive solutions tailored to your business.`,
        features: [
          'Custom iOS & Android App Development.',
          'Cross-platform with Flutter & React Native.',
          'Robust Backend Integration and UX-focused Design.'
        ],
        image: 'assets/images/app.png'
      },
      seo: {
        title: 'Drive Traffic and Boost Visibility with SEO & Marketing',
        subtitle: 'Rank Higher, Reach Further',
        description: `Our SEO and digital marketing experts help your business stand out online. We optimize your site and promote your brand across platforms to maximize reach and conversions.`,
        features: [
          'On-page & Off-page SEO.',
          'Technical Optimization for Speed & Structure.',
          'Social Media, PPC, and Blog Promotion.'
        ],
        image: 'assets/images/seo.jpg'
      }
    };

    const content = serviceData[this.serviceType];
    Object.assign(this, content);
  }
}
