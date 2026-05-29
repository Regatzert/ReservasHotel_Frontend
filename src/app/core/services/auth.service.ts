import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

  registerUser(data: any): Observable<any> {

    return this.http.post(
      `${this.apiService.BASE_URL}/auth/register`,
      data
    );
  }

  loginUser(data: any): Observable<any> {

    return this.http.post(
      `${this.apiService.BASE_URL}/auth/login`,
      data
    );
  }

  logout(): void {
    this.storageService.clearAuth();
  }

  isAuthenticated(): boolean {
    return !!this.storageService.getToken();
  }

  isAdmin(): boolean {
    return this.storageService.getRole() === 'ADMIN';
  }

  isCustomer(): boolean {
    return this.storageService.getRole() === 'CUSTOMER';
  }
}