import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';

const API_URL = 'http://localhost:4000';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // ... otros campos si tu token los incluye
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  private currentUser$$ = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUser$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {
    const token = this.sessionStorage.getToken();
    if (token) {
      this.isAuthorized = true;
      const user = this.decodeToken(token);
      this.currentUser$$.next(user);
    }
  }

  login(payload: LoginPayload): Observable<any> {
  return this.http.post<any>(`${API_URL}/login`, payload).pipe(
    tap((response) => {
      console.log('[AuthService] Respuesta completa del backend:', response);

      const bearerToken = response.result;
      const token = bearerToken?.replace('Bearer ', '').trim();
      console.log('[AuthService] Token recibido del backend:', token);

      this.sessionStorage.setToken(token);
      this.isAuthorized = true;

      const user = response.user;
      console.log('[AuthService] Usuario recibido del backend:', user);

      this.currentUser$$.next(user); 
    })
  );
}

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${API_URL}/register`, payload);
  }

  logout(): void {
    this.sessionStorage.deleteToken();
    this.isAuthorized = false;
    this.currentUser$$.next(null);
    this.router.navigate(['/login']);
  }

  get isAuthorized(): boolean {
    return this.isAuthorized$$.getValue();
  }

  set isAuthorized(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return `${API_URL}/login`;
  }

  private decodeToken(token: string): User | null {
    try {
      if (!token || typeof token !== 'string' || !token.includes('.')) {
        console.warn('[AuthService] Invalid token format:', token);
        return null;
      }

      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      };
    } catch (e) {
      console.error('[AuthService] Error decoding token:', e);
      return null;
    }
  }
}
