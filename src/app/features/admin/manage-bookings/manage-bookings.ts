import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-manage-bookings',
  imports: [FormsModule, Pagination],
  templateUrl: './manage-bookings.html',
  styleUrl: './manage-bookings.css',
})
export class ManageBookings implements OnInit{
  bookings: any[] = [];
  filteredBookings: any[] = [];

  searchTerm = '';

  currentPage = 1;
  bookingsPerPage = 10;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (resp: any) => {
        this.bookings = resp.bookings || [];
        this.filteredBookings = [...this.bookings];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSearchChange(): void {

    this.currentPage = 1;

    if (!this.searchTerm.trim()) {
      this.filteredBookings = [...this.bookings];
      return;
    }

    this.filteredBookings = this.bookings.filter(
      booking =>
        booking.bookingReference
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );
  }

  get currentBookings(): any[] {

    const last = this.currentPage * this.bookingsPerPage;
    const first = last - this.bookingsPerPage;

    return this.filteredBookings.slice(first, last);
  }

  paginate(page: number): void {
    this.currentPage = page;
  }

  manageBooking(reference: string): void {
    this.router.navigate([
      '/admin/edit-booking',
      reference
    ]);
  }
}
