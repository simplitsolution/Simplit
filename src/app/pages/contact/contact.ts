import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactInfo = {
    address: {
      line1: ' 332 - Skyview Business Horizon',
      line2: 'Surat - Kamrej Hwy, opp. Dreamland Party Plot',
      line3: 'Surat, Gujarat 395006'
    },
    phone: '+91 84605 50273',
    email: 'hr@Simplit.com'
  };

}
