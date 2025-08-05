import { ChangeDetectorRef, Component, OnInit , NgZone, OnDestroy, Inject, PLATFORM_ID  } from '@angular/core';
import { aboutCardDetails } from '../../shared/utils/data';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate , state  } from '@angular/animations';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  standalone: true,
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('1000ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0%)', opacity: 1 }))
      ])
    ])
  ]

})
export class About implements OnInit, OnDestroy {
  readonly cardDetails = aboutCardDetails;
  visibleCards: any[] = [];
  batchIndex = 0;
  private intervalId: any;
  isHovered = false;
  isAnimating = false;
  slideDirection = 0;

  private resizeObserver!: ResizeObserver;
  private containerElement!: HTMLElement;

  CARDS_PER_BATCH = 4; // Will update dynamically
  totalBatches = 1;

  readonly SLIDE_INTERVAL = 4000;

constructor(
  private readonly cdr: ChangeDetectorRef,
  private readonly ngZone: NgZone,
  @Inject(PLATFORM_ID) private platformId: Object
) {}


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.containerElement = document.querySelector('.grid') as HTMLElement;
      this.observeResize();
      this.initializeCards();
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    this.clearAutoSlide();
    this.resizeObserver?.disconnect();
  }

  private observeResize(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateCardsPerBatch();
      this.updateVisibleCards();
      this.cdr.detectChanges();
    });

    if (this.containerElement) {
      this.resizeObserver.observe(this.containerElement);
    }
  }

  private updateCardsPerBatch(): void {
    const width = window.innerWidth;

    if (width >= 1024) {
      this.CARDS_PER_BATCH = 4;
    } else if (width >= 768) {
      this.CARDS_PER_BATCH = 2;
    } else {
      this.CARDS_PER_BATCH = 1;
    }

    this.totalBatches = Math.ceil(this.cardDetails.length / this.CARDS_PER_BATCH);
    this.batchIndex = Math.min(this.batchIndex, this.totalBatches - 1);
  }

  private initializeCards(): void {
    this.updateCardsPerBatch();
    this.updateVisibleCards();
  }

  private updateVisibleCards(): void {
    const start = this.batchIndex * this.CARDS_PER_BATCH;
    const end = start + this.CARDS_PER_BATCH;

    this.visibleCards = this.cardDetails.slice(start, end);
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

    setTimeout(() => {
      this.ngZone.run(() => {
        this.isAnimating = false;
      });
    }, 650);
  }

  goToBatch(index: number): void {
    if (index !== this.batchIndex && !this.isAnimating) {
      this.isAnimating = true;
      this.slideDirection = index > this.batchIndex ? this.slideDirection + 1 : this.slideDirection - 1;
      this.batchIndex = index;
      this.updateVisibleCards();

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

  trackByFn(index: number, item: any): string {
    return `${item.title}-${index}`;
  }
}
