import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-admin-page',
  imports: [RouterModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage implements OnInit{
  adminName = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.userService
      .myProfile()
      .subscribe({

        next: (resp: any) => {
          this.adminName = resp.user.firstName;
        },

        error: (err) => {
          console.error(err);
        }
      });
  }

  goManageRooms(): void {
    this.router.navigate(['/admin/manage-rooms']);
  }

  goManageBookings(): void {
    this.router.navigate(['/admin/manage-bookings']);
  }
}
