import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit {
  @ViewChild('myVideo') videoRef!: ElementRef<HTMLVideoElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const videoEl = this.videoRef?.nativeElement;

      if (videoEl instanceof HTMLVideoElement) {
        videoEl.autoplay = true;
        videoEl.loop = true;
        videoEl.muted = true;

        videoEl.load();

        videoEl.addEventListener('loadeddata', () => {
          videoEl.play().catch(err => {
            console.warn('Autoplay failed after reload:', err);
          });
        });
      }
    }
  }


}