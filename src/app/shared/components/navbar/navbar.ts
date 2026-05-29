import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    private authService: AuthService
  ) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isCustomer(): boolean {
    return this.authService.isCustomer();
  }

  logout(): void {

    const confirmed = confirm(
      'Are you sure you want to logout?'
    );

    if (!confirmed) return;

    this.authService.logout();
  }
}
