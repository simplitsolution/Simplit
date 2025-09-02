import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Header } from '../../../shared/components/header/header';
import { Footer } from "../../../shared/components/footer/footer";
import { animate, style, transition, trigger } from '@angular/animations';

type ServiceType = 'web' | 'mobile' | 'seo';

@Component({
  selector: 'app-expertisedetail',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './expertisedetail.html',
  styleUrls: ['./expertisedetail.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '1000ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ transform: 'translateX(0%)', opacity: 1 })
        ),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '600ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ transform: 'translateX(0%)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class Expertisedetail implements OnInit {
  title = '';
  subtitle = '';
  description = '';
  features: string[] = [];
  image = '';
  serviceType: ServiceType = 'web';
  cardsPerSlide = 3;
  currentSlideIndex = 0;
  technologies = [];

  constructor(private route: ActivatedRoute, private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      if (this.isValidServiceType(type)) {
        this.serviceType = type;
        this.loadContent();
      }
    });

    this.setCardsPerSlide(window.innerWidth);

    window.addEventListener('resize', () => {
      this.setCardsPerSlide(window.innerWidth);
    });

    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      if (this.isValidServiceType(type)) {
        this.serviceType = type;
        this.loadContent();
      }
    });
    if (isPlatformBrowser(this.platformId)) {
      this.containerElement = document.querySelector('.grid') as HTMLElement;
      this.observeResize();
      this.initializeCards();
      this.startAutoSlide();
      this.globalClickUnlistener = this.listenForDocumentClick();
    }
  }

  setCardsPerSlide(width: number) {
    if (width < 640) {
      this.cardsPerSlide = 1;
    } else if (width < 768) {
      this.cardsPerSlide = 2;
    } else {
      this.cardsPerSlide = 3;
    }
  }

  private isValidServiceType(value: string | null): value is ServiceType {
    return value === 'web' || value === 'mobile' || value === 'seo';
  }

  get totalSlides() {
    return Math.ceil(this.technologies.length / this.cardsPerSlide);
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
  }

  loadContent() {
    const serviceData: Record<ServiceType, {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      image: string;
      technologies: any[];
    }> = {
      web: {
        title: 'Creating Engaging Digital Experiences with Web Design and Development',
        subtitle: 'Your Vision, Our Code',
        description: `At Aeybit, we bring your online vision to life with cutting-edge web design and development services. Our focus is on delivering websites that are not only aesthetically pleasing but also highly functional and tailored to meet your business goals.`,
        features: [
          'Modern UI/UX Design using Figma, Adobe XD, and Sketch.',
          'Custom Website Development with React, Angular, and Vue.',
          'Backend Solutions using Node.js, .Net, Laravel, and Express.'
        ],
        image: 'assets/images/web.png',
        technologies: [
          { name: 'Node.js', logo: 'assets/icons/nodejs.svg' },
          { name: '.NET', logo: 'assets/icons/dotnet.svg' },
          { name: 'Laravel', logo: 'assets/icons/laravel.svg' },
          { name: 'Express', logo: 'assets/icons/expressjs.svg' },
          { name: 'Angular', logo: 'assets/icons/angular.svg' },
          { name: 'React', logo: 'assets/icons/reactjs.svg' },
          { name: 'Vue.js', logo: 'assets/icons/vuejs.svg' },
          { name: 'Adobe XD', logo: 'assets/icons/adobe-xd.svg' },
          { name: 'Figma', logo: 'assets/icons/figma.png' },
        ]
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
        image: 'assets/images/app.png',
        technologies: [
          { name: 'iOS', logo: 'assets/icons/ios.svg' },
          { name: 'Android', logo: 'assets/icons/android.svg' },
          { name: 'Flutter', logo: 'assets/icons/flutterio.svg' },
          { name: 'React Native', logo: 'assets/icons/react-native.svg' },
          { name: 'UX-focused Design', logo: 'assets/icons/ui-ux.png' },
          { name: 'Dart', logo: 'assets/icons/dart.svg' },
        ],
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
        image: 'assets/images/seo.jpg',
        technologies: [
          { name: 'On-page SEO', logo: 'assets/icons/onpage-seo.png' },
          { name: 'Off-page SEO', logo: 'assets/icons/offpage-seo.png' },
          { name: '', logo: 'assets/icons/laravel.svg' },
          { name: '', logo: 'assets/icons/express.svg' },
          { name: '', logo: 'assets/icons/angular.svg' },
          { name: '', logo: 'assets/icons/react.svg' },
          { name: '.js', logo: 'assets/icons/vue.svg' },
          { name: '', logo: 'assets/icons/flutter.svg' },
          { name: '', logo: 'assets/icons/figma.svg' },
        ],
      }
    };

    const content = serviceData[this.serviceType];
    Object.assign(this, content);
  }
  currentSlideTechnologies: any[] = [];
  batchIndex = 0;
  private intervalId: any;
  isHovered = false;
  isAnimating = false;
  slideDirection = 0;

  activeCardIndex: number | null = null;

  private resizeObserver?: ResizeObserver;
  private containerElement?: HTMLElement;
  private globalClickUnlistener?: () => void;

  CARDS_PER_BATCH = 3;
  totalBatches = 1;
  readonly SLIDE_INTERVAL = 4000;

  private touchStartX = 0;
  private touchEndX = 0;

  ngOnDestroy(): void {
    this.clearAutoSlide();

    if (this.globalClickUnlistener) {
      this.globalClickUnlistener();
      this.globalClickUnlistener = undefined;
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }

  private observeResize(): void {
    if (!this.containerElement) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.updateCardsPerBatch();
      this.updateVisibleCards();
      this.cdr.detectChanges();
    });

    this.resizeObserver.observe(this.containerElement);
  }

  private updateCardsPerBatch(): void {
    const width = window.innerWidth;

    if (width >= 1024) {
      this.CARDS_PER_BATCH = 3;
    } else if (width >= 768) {
      this.CARDS_PER_BATCH = 2;
    } else {
      this.CARDS_PER_BATCH = 1;
    }

    this.totalBatches = Math.ceil(
      this.technologies.length / this.CARDS_PER_BATCH
    );
    this.batchIndex = Math.min(this.batchIndex, this.totalBatches - 1);
  }

  private initializeCards(): void {
    this.updateCardsPerBatch();
    this.updateVisibleCards();
  }

  private updateVisibleCards(): void {
    const start = this.batchIndex * this.CARDS_PER_BATCH;
    const end = start + this.CARDS_PER_BATCH;

    this.currentSlideTechnologies = this.technologies.slice(start, end);
    this.cdr.markForCheck();
  }

  private startAutoSlide(): void {
    this.clearAutoSlide();

    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          if (!this.isHovered && !this.isAnimating) {
            this.nextBatch();
          }
        });
      }, this.SLIDE_INTERVAL);
    });
  }

  private clearAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private nextBatch(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.batchIndex = (this.batchIndex + 1) % this.totalBatches;
    this.slideDirection++;
    this.updateVisibleCards();
    this.activeCardIndex = null;

    setTimeout(() => {
      this.ngZone.run(() => {
        this.isAnimating = false;
      });
    }, 650);
  }

  private prevBatch(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.batchIndex =
      (this.batchIndex - 1 + this.totalBatches) % this.totalBatches;
    this.slideDirection--;
    this.updateVisibleCards();
    this.activeCardIndex = null;

    setTimeout(() => {
      this.ngZone.run(() => {
        this.isAnimating = false;
      });
    }, 650);
  }

  goToBatch(index: number): void {
    if (index !== this.batchIndex && !this.isAnimating) {
      this.isAnimating = true;
      this.slideDirection =
        index > this.batchIndex
          ? this.slideDirection + 1
          : this.slideDirection - 1;
      this.batchIndex = index;
      this.updateVisibleCards();
      this.activeCardIndex = null;

      setTimeout(() => {
        this.ngZone.run(() => {
          this.isAnimating = false;
        });
      }, 650);
    }
  }

  onMouseEnter(): void {
    this.isHovered = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture();
  }

  private handleSwipeGesture(): void {
    const swipeDistance = this.touchEndX - this.touchStartX;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        this.prevBatch();
      } else {
        this.nextBatch();
      }
    }
  }

  onCardClick(index: number): void {
    if (this.isMobile()) {
      this.activeCardIndex = this.activeCardIndex === index ? null : index;
    }
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  private listenForDocumentClick(): () => void {
    const handler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.card-wrapper')) {
        this.activeCardIndex = null;
        this.cdr.markForCheck();
      }
    };

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler, true);
    };
  }

  trackByFn(index: number, item: any): string {
    return `${item.title}-${index}`;
  }
}


