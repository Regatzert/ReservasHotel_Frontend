import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit{
  user: any = null;
  bookings: any[] = [];
  error: string | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  async fetchUserProfile() {
    try {

      const myProfileResponse: any = await firstValueFrom(
        this.userService.myProfile()
      );

      this.user = myProfileResponse.user;

      const myBookingResponse: any = await firstValueFrom(
        this.userService.myBookings()
      );

      this.bookings = myBookingResponse.bookings;

    } catch (error: any) {
      this.error =
        error?.response?.data?.message || error.message;
    }
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  handleEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
}
