import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { map, Observable } from 'rxjs';
import { User } from '@app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
    isAuthorized$: Observable<boolean> = this.store.pipe(select(AuthSelectors.selectIsAuthorized));
    currentUser$: Observable<User | null> = this.store.pipe(select(AuthSelectors.selectCurrentUser));
    error$: Observable<any> = this.store.pipe(select(AuthSelectors.selectAuthError));

    isAdmin$: Observable<boolean> = this.currentUser$.pipe(
        map(user => user?.role === 'admin')
    );

    constructor(private store: Store) {}

    login(email: string, password: string): void {
        this.store.dispatch(AuthActions.loginRequest({ email, password }));
    }

    register(name: string, email: string, password: string): void {
        this.store.dispatch(AuthActions.registerRequest({ name, email, password }));
    }

    logout(): void {
        this.store.dispatch(AuthActions.logout());
    }

    loadUserFromToken(): void {
        this.store.dispatch(AuthActions.loadUserFromToken());
    }
}
