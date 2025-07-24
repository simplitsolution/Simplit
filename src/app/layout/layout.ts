import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Header, CommonModule,RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
