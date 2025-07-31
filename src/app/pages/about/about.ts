import { Component } from '@angular/core';
import { aboutCardDetails } from '../../shared/utils/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  standalone: true
})
export class About {
  cardDetails = aboutCardDetails;
}