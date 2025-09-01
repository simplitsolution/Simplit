import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  inject
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { contactCardDetail, EMAIL_ID } from '../../shared/utils/data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
      console.log('Form submitted:', this.contactForm.value);
      const formData = this.contactForm.value;
      const message = `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      Description: ${formData.description}

      Please reach out to ${EMAIL_ID} email.
      `;
      alert(message);
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
