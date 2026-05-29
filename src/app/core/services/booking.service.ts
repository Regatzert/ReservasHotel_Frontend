import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  getBookingByReference(bookingCode: string) {

    return this.http.get(
      `${this.apiService.BASE_URL}/bookings/${bookingCode}`
    );
  }

  bookRoom(booking: any) {

    return this.http.post(
      `${this.apiService.BASE_URL}/bookings`,
      booking
    );
  }

  getAllBookings() {

    return this.http.get(
      `${this.apiService.BASE_URL}/bookings/all`
    );
  }

  updateBooking(booking: any) {

    return this.http.put(
      `${this.apiService.BASE_URL}/bookings/update`,
      booking
    );
  }

}