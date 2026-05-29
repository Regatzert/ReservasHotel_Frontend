import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../core/services/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { RoomResult } from '../room-result/room-result';
import { RoomSearch } from '../room-search/room-search';

@Component({
  selector: 'app-all-rooms',
  imports: [CommonModule, FormsModule, RoomSearch, RoomResult, Pagination],
  templateUrl: './all-rooms.html',
  styleUrl: './all-rooms.css',
})
export class AllRooms implements OnInit {
  rooms: any[] = [];

  filteredRooms: any[] = [];

  roomTypes: string[] = [];

  selectedRoomType = '';

  currentPage = 1;

  roomsPerPage = 9;

  constructor(
    private roomService: RoomService
  ) {}

  ngOnInit(): void {

    this.fetchRooms();

    this.fetchRoomTypes();
  }

  fetchRooms(): void {

    this.roomService
      .getAllRooms()
      .subscribe({

        next: (resp: any) => {

          this.rooms = resp.rooms;

          this.filteredRooms = resp.rooms;
        },

        error: (err) => {
          console.log(err);
        }
      });
  }

  fetchRoomTypes(): void {

    this.roomService
      .getRoomTypes()
      .subscribe({

        next: (types: any) => {
          this.roomTypes = types;
        },

        error: (err) => {
          console.log(err);
        }
      });
  }

  handleSearchResult(
    results: any[]
  ): void {

    this.rooms = results;

    this.filteredRooms = results;
  }

  handleRoomTypeChange(): void {

    this.filterRooms(
      this.selectedRoomType
    );
  }

  filterRooms(type: string): void {

    if (!type) {

      this.filteredRooms = this.rooms;

    } else {

      this.filteredRooms =
        this.rooms.filter(
          room => room.type === type
        );
    }

    this.currentPage = 1;
  }

  paginate(page: number): void {

    this.currentPage = page;
  }

  get currentRooms(): any[] {

    const indexOfLastRoom =
      this.currentPage * this.roomsPerPage;

    const indexOfFirstRoom =
      indexOfLastRoom - this.roomsPerPage;

    return this.filteredRooms.slice(
      indexOfFirstRoom,
      indexOfLastRoom
    );
  }
}
