import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import {
  switchMap,
  filter,
  take,
  timeout,
  catchError,
  tap
} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthorized$.pipe(
      // tap((val) => console.log('[AuthorizedGuard] Checking isAuthorized$', val)),
      filter((val) => val === true),
      take(1),
      timeout(2000),
      catchError(() => {
        console.warn('[AuthorizedGuard] Timeout or error, redirecting to login');
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
