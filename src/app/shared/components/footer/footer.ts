import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EMAIL_ID } from '../../utils/data';

@Component({
  selector: 'app-footer',
  imports: [CommonModule,RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  emailId = EMAIL_ID;
}
