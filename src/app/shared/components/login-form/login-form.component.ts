import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnDestroy {
  @ViewChild('loginForm') public loginForm!: NgForm;
  public submitted = false;
  public loginError: string | null = null;
  private sub = new Subscription();

  constructor(
    library: FaIconLibrary,
    private authService: AuthService,
    private router: Router
  ) {
    library.addIcons(faEye, faEyeSlash);
  }

  goToRegistration(): void {
    this.router.navigate(['/registration']);
  }

  onSubmit(): void {
    this.submitted = true;
    this.loginError = null;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: () => {
          // Verificar si es admin
          const userSub = this.authService.currentUser$
            .pipe(take(1))
            .subscribe((user) => {
              if (user?.role === 'admin') {
                console.log('[LoginFormComponent] Usuario es ADMIN');
              } else {
                console.log('[LoginFormComponent] Usuario es: ', user?.role);
              }
            });

          this.sub.add(userSub);

          // Redirección cuando está autorizado
          const authSub = this.authService.isAuthorized$
            .pipe(
              filter((auth) => auth === true),
              take(1)
            )
            .subscribe(() => {
              this.router.navigate(['/courses']).then((success) =>
                console.log('[LoginFormComponent] Navigation to /courses success?', success)
              );
            });

          this.sub.add(authSub);
        },
        error: (err) => {
          this.loginError = err.error?.message || 'Invalid email or password';
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
