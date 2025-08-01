import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
  UrlTree,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  private checkNotAuth(): Observable<boolean | UrlTree> {
    if (!this.authService.isAuthorized) {
      return of(true);
    }
    return of(this.router.createUrlTree(['/courses']));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkNotAuth();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> {
    return this.checkNotAuth();
  }
}
