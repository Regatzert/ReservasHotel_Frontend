import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-edit-bookings',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-bookings.html',
  styleUrl: './edit-bookings.css',
})
export class EditBookings implements OnInit {

  bookingCode = '';
  bookingDetails: any;
  message = '';
  success = false;

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {
    this.form = this.fb.group({
      id: [''],
      bookingStatus: [''],
      paymentStatus: ['']
    });
  }

  ngOnInit(): void {
    this.bookingCode =
      this.route.snapshot.paramMap.get('bookingCode')!;

    this.loadBooking();
  }

  loadBooking(): void {
    this.bookingService
      .getBookingByReference(this.bookingCode)
      .subscribe({
        next: (resp: any) => {
          this.bookingDetails = resp.booking;

          this.form.patchValue({
            id: resp.booking.id,
            bookingStatus: resp.booking.bookingStatus,
            paymentStatus: resp.booking.paymentStatus
          });
        },

        error: (err) => {
          this.success = false;
          this.message =
            err.error?.message || err.message;
        }
      });
  }

  updateBooking(): void {
    this.bookingService
      .updateBooking(this.form.value)
      .subscribe({
        next: () => {
          this.success = true;
          this.message =
            'Booking updated successfully';

          setTimeout(() => {
            this.router.navigate([
              '/admin/manage-bookings'
            ]);
          }, 3000);
        },

        error: (err) => {
          this.success = false;
          this.message =
            err.error?.message || err.message;
        }
      });
  }
}