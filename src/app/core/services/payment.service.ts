import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  proceedForPayment(body: any) {

    return this.http.post(
      `${this.apiService.BASE_URL}/payments/pay`,
      body
    );
  }

  updateBookingPayment(body: any) {

    return this.http.put(
      `${this.apiService.BASE_URL}/payments/update`,
      body
    );
  }

}