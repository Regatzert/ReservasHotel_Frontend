import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile implements OnInit{
  user: any = null;
  error: string | null = null;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  async fetchUserProfile() {
    try {
      const response: any = await firstValueFrom(
        this.userService.myProfile()
      );

      this.user = response.user;

    } catch (error: any) {
      this.error = error?.message;
    }
  }

  async handleDeleteProfile() {

    const confirmDelete = confirm(
      'Are you sure you want to delete your account? If you delete your account you will lose access to your profile and booking history'
    );

    if (!confirmDelete) return;

    try {
      await firstValueFrom(
        this.userService.deleteAccount()
      );

      this.router.navigate(['/signup']);

    } catch (error: any) {
      this.error =
        error?.response?.data?.message || error.message;
    }
  }
}
