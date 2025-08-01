import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  public submitted = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(faEye, faEyeSlash);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login values:', { email, password });
      // Here goes the logic to handle the login
    }
  }
}
