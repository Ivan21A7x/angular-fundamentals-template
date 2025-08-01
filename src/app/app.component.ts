import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from './store/auth/auth.facade';
import { User } from './auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'courses-app';
  user: User | null = null;

  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authFacade.currentUser$.subscribe((user) => {
      this.user = user;
    });

    this.authFacade.loadUserFromToken(); // Carga usuario desde token si existe
  }

  logout(): void {
    console.log('Logout clicked');
    this.authFacade.logout();
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
