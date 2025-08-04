import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '@app/auth/services/auth.service';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthorized: boolean;
  user: User | null;
  error: any;
}

export const initialState: AuthState = {
  isAuthorized: false,
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  // Login
  on(AuthActions.loginRequest, state => ({
    ...state,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    isAuthorized: true,
    user,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isAuthorized: false,
    user: null,
    error,
  })),

  // Register
  on(AuthActions.registerRequest, state => ({
    ...state,
    error: null,
  })),
  on(AuthActions.registerSuccess, state => ({
    ...state,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Load user from token
  on(AuthActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthorized: true,
  })),

  // Logout
  on(AuthActions.logout, state => ({
    ...state,
    isAuthorized: false,
    user: null,
    error: null,
  }))
);
