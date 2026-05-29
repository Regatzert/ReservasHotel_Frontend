import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../core/services/room.service';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-room-details',
  imports: [],
  templateUrl: './room-details.html',
  styleUrl: './room-details.css',
})
export class RoomDetails implements OnInit{
  room: any = null;

  checkInDate!: string;

  checkOutDate!: string;

  totalPrice = 0;

  totalDaysToStay = 0;

  showBookingPreview = false;

  showMessage = '';

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const roomId =
      this.route.snapshot.paramMap.get('id');

    if (roomId) {

      this.fetchRoomDetails(roomId);
    }
  }

  fetchRoomDetails(
    roomId: string
  ): void {

    this.roomService
      .getRoomById(roomId)
      .subscribe({

        next: (resp: any) => {

          this.room = resp.room;
        },

        error: (err) => {
          console.log(err);
        }
      });
  }

  calculateTotalPrice(): number {

    if (
      !this.checkInDate ||
      !this.checkOutDate
    ) {
      return 0;
    }

    const oneDay =
      24 * 60 * 60 * 1000;

    const totalDays =
      Math.round(

        Math.abs(

          (
            new Date(this.checkOutDate).getTime()
            -
            new Date(this.checkInDate).getTime()
          ) / oneDay
        )
      );

    this.totalDaysToStay = totalDays;

    return (
      this.room.pricePerNight
      * totalDays
    );
  }

  handleConfirmation(): void {

    if (
      !this.checkInDate ||
      !this.checkOutDate
    ) {

      this.errorMessage =
        'Please select dates';

      return;
    }

    this.totalPrice =
      this.calculateTotalPrice();

    this.showBookingPreview = true;
  }

  acceptBooking(): void {

    const booking = {

      checkInDate: this.checkInDate,

      checkOutDate: this.checkOutDate,

      roomId: this.room.id
    };

    this.bookingService
      .bookRoom(booking)
      .subscribe({

        next: (resp: any) => {

          if (resp.status === 200) {

            this.showMessage =
              'Booking Successful';

            setTimeout(() => {

              this.router.navigate(['/rooms']);

            }, 5000);
          }
        },

        error: (err) => {

          this.errorMessage =
            err.error?.message || 'Error';
        }
      });
  }

}
