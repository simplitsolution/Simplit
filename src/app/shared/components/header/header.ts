// old code

// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { navbarDetails } from '../../utils/data';

// @Component({
//   selector: 'app-header',
//   imports: [CommonModule, RouterModule],
//   templateUrl: './header.html',
//   styleUrl: './header.scss'
// })
// export class Header {

//   navDetails: any = navbarDetails;
  
// }


// its my new code

import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { navbarDetails } from '../../utils/data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  isScrolled = false;
  navDetails: any = navbarDetails;
  constructor(private cdr: ChangeDetectorRef) {}

  // Detect scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 50;
    this.cdr.detectChanges();

  }
}


