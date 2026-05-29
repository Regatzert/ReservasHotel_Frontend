import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RoomService } from '../../../core/services/room.service';

@Component({
  selector: 'app-room-search',
  imports: [CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './room-search.html',
  styleUrl: './room-search.css',
})
export class RoomSearch  implements OnInit{
  @Output()
  searchResult =
    new EventEmitter<any[]>();

  startDate: Date | null = null;

  endDate: Date | null = null;

  roomType = '';

  roomTypes: string[] = [];

  error = '';

  constructor(
    private roomService: RoomService
  ) {}

  ngOnInit(): void {

    this.fetchRoomTypes();
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

  showError(
    message: string
  ): void {

    this.error = message;

    setTimeout(() => {

      this.error = '';

    }, 5000);
  }

  handleSearch(): void {

    if (
      !this.startDate ||
      !this.endDate ||
      !this.roomType
    ) {

      this.showError(
        'Please select fields'
      );

      return;
    }

    const formattedStartDate =
      this.startDate
        .toLocaleDateString('en-CA');

    const formattedEndDate =
      this.endDate
        .toLocaleDateString('en-CA');

    this.roomService
      .getAvailableRooms(
        formattedStartDate,
        formattedEndDate,
        this.roomType
      )
      .subscribe({

        next: (resp: any) => {

          if (
            resp.rooms.length === 0
          ) {

            this.showError(
              'Room type not available'
            );

            return;
          }

          this.searchResult.emit(
            resp.rooms
          );

          this.error = '';
        },

        error: (err) => {

          this.showError(
            err.error?.message || 'Error'
          );
        }
      });
  }
}
