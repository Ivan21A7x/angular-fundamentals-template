import { createAction, props } from '@ngrx/store';
import { AuthConstants } from './auth.constants';
import { User } from '@app/auth/services/auth.service';

// Login
export const loginRequest = createAction(
  AuthConstants.LOGIN_REQUEST,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  AuthConstants.LOGIN_SUCCESS,
  props<{ token: string; user: User }>()
);

export const loginFailure = createAction(
  AuthConstants.LOGIN_FAILURE,
  props<{ error: any }>()
);

// Register
export const registerRequest = createAction(
  AuthConstants.REGISTER_REQUEST,
  props<{ name: string; email: string; password: string }>()
);

export const registerSuccess = createAction(AuthConstants.REGISTER_SUCCESS);

export const registerFailure = createAction(
  AuthConstants.REGISTER_FAILURE,
  props<{ error: any }>()
);

// Load user from token
export const loadUserFromToken = createAction(AuthConstants.LOAD_USER_FROM_TOKEN);

export const loadUserSuccess = createAction(
  AuthConstants.LOAD_USER_SUCCESS,
  props<{ user: User }>()
);

// Logout
export const logout = createAction(AuthConstants.LOGOUT);
