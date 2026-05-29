import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomResult } from '../../booking-rooms/room-result/room-result';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';
import { RoomService } from '../../../core/services/room.service';

@Component({
  selector: 'app-manage-rooms',
  imports: [FormsModule,
    RoomResult,
    Pagination],
  templateUrl: './manage-rooms.html',
  styleUrl: './manage-rooms.css',
})
export class ManageRooms implements OnInit{
  rooms: any[] = [];
  filteredRooms: any[] = [];

  roomTypes: string[] = [];

  currentPage = 1;
  roomsPerPage = 8;

  selectedRoomType = '';

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadRooms();
    this.loadRoomTypes();
  }

  loadRooms(): void {

    this.roomService.getAllRooms().subscribe({
      next: (resp: any) => {
        this.rooms = resp.rooms;
        this.filteredRooms = resp.rooms;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadRoomTypes(): void {

    this.roomService.getRoomTypes().subscribe({
      next: (types: any) => {
        this.roomTypes = types;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  filterRoomFunction(type: string): void {

    if (!type) {

      this.filteredRooms = [...this.rooms];

    } else {

      this.filteredRooms =
        this.rooms.filter(room => room.type === type);
    }

    this.currentPage = 1;
  }

  get currentRooms(): any[] {

    const last = this.currentPage * this.roomsPerPage;
    const first = last - this.roomsPerPage;

    return this.filteredRooms.slice(first, last);
  }

  paginate(page: number): void {
    this.currentPage = page;
  }

  addRoom(): void {
    this.router.navigate(['/admin/add-room']);
  }
}
