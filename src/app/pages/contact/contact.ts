import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  inject
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { contactCardDetail, EMAIL_ID, INFO_EMAIL_ID } from '../../shared/utils/data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {
  isVisible = signal(false);

  contactInfo = contactCardDetail;

  contactForm!: FormGroup;

  private fb = inject(FormBuilder);

  constructor(private el: ElementRef) {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            this.isVisible.set(entry.isIntersecting);
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(this.el.nativeElement);
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
     const formData = this.contactForm.value;

    const message = `
    Name: ${formData.name}
    Email: ${formData.email}
    Subject: ${formData.subject}
    Description: ${formData.description}

    Please reach out to ${INFO_EMAIL_ID}.
    `;

    Swal.fire({
      text: message,
      icon: 'info',
      confirmButtonText: 'OK',
      buttonsStyling: false, 
      customClass: {
        confirmButton: 'bg-[#e03a3c] text-white px-4 py-2 rounded-md hover:bg-red-600',
        popup: 'text-left whitespace-pre-wrap'
      }
    });

    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
