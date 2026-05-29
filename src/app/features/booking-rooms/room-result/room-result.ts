import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-result',
  imports: [CommonModule],
  templateUrl: './room-result.html',
  styleUrl: './room-result.css',
})
export class RoomResult {
  @Input()
  roomSearchResults: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isAdmin(): boolean {

    return this.authService.isAdmin();
  }

  navigateToRoom(
    roomId: string
  ): void {

    this.router.navigate([
      '/room-details',
      roomId
    ]);
  }

  navigateToEdit(
    roomId: string
  ): void {

    this.router.navigate([
      '/admin/edit-room',
      roomId
    ]);
  }
}
