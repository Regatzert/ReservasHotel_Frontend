import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  myProfile() {

    return this.http.get(
      `${this.apiService.BASE_URL}/users/account`
    );
  }

  myBookings() {

    return this.http.get(
      `${this.apiService.BASE_URL}/users/bookings`
    );
  }

  deleteAccount() {

    return this.http.delete(
      `${this.apiService.BASE_URL}/users/delete`
    );
  }

}