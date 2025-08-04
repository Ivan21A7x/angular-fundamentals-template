import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  standalone: false,
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      alert('User registered successfully!');
      this.goToLogin();
    }
  }

  // Helpers for the template to access form controls
  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }
}
