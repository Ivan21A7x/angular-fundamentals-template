import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@app/auth/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from '@app/auth/services/session-storage.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private sessionStorage: SessionStorageService,
        private router: Router
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
        ofType(AuthActions.loginRequest),
        mergeMap(({ email, password }) =>
            this.authService.login({ email, password }).pipe(
              map((response) => {
                const token = response.result?.replace('Bearer ', '').trim();
                if (token) {
                  this.sessionStorage.setToken(token);
                  const user = response.user;
                  return AuthActions.loginSuccess({ token, user });
                } else {
                    return AuthActions.loginFailure({ error: 'Token missing in response' });
                }
            }),
                catchError((error) => of(AuthActions.loginFailure({ error })))
            )
        )
    ));

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.registerRequest),
            mergeMap(({ name, email, password }) =>
                this.authService.register({ name, email, password }).pipe(
                    map(() => AuthActions.registerSuccess()),
                    catchError((error) => of(AuthActions.registerFailure({ error })))
                )
            )
        )
    );

    loadUserFromToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loadUserFromToken),
            map(() => {
                const token = this.sessionStorage.getToken();
                const user = token ? this.authService['decodeToken'](token) : null;

                return user
                    ? AuthActions.loadUserSuccess({ user })
                    : AuthActions.logout(); 
            })
        )
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    this.sessionStorage.deleteToken();
                    this.router.navigate(['/login']);
                })
            ),
        { dispatch: false }
    );

    loginRedirect$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(() => {
                this.router.navigate(['/courses']);
            })
        ),
        { dispatch: false }
    );
}
