import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-find-booking',
  imports: [FormsModule],
  templateUrl: './find-booking.html',
  styleUrl: './find-booking.css',
})
export class FindBooking {
  confirmationCode = '';

  bookingDetails: any = null;

  error = '';

  constructor(
    private bookingService: BookingService
  ) {}

  handleSearch(): void {

    if (!this.confirmationCode.trim()) {

      this.error =
        'Please Enter a booking confirmation code';

      return;
    }

    this.bookingService
      .getBookingByReference(
        this.confirmationCode
      )
      .subscribe({

        next: (resp: any) => {

          this.bookingDetails =
            resp.booking;

          this.error = '';
        },

        error: (err) => {

          this.error =
            err.error?.message || 'Error';
        }
      });
  }
}
