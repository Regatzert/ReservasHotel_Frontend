import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  addRoom(formData: FormData) {

    return this.http.post(
      `${this.apiService.BASE_URL}/rooms/add`,
      formData
    );
  }

  getRoomTypes() {

    return this.http.get(
      `${this.apiService.BASE_URL}/rooms/types`
    );
  }

  getAllRooms() {

    return this.http.get(
      `${this.apiService.BASE_URL}/rooms/all`
    );
  }

  getRoomById(roomId: string) {

    return this.http.get(
      `${this.apiService.BASE_URL}/rooms/${roomId}`
    );
  }

  deleteRoom(roomId: string) {

    return this.http.delete(
      `${this.apiService.BASE_URL}/rooms/delete/${roomId}`
    );
  }

  updateRoom(formData: FormData) {

    return this.http.put(
      `${this.apiService.BASE_URL}/rooms/update`,
      formData
    );
  }

  getAvailableRooms(
    checkInDate: string,
    checkOutDate: string,
    roomType: string
  ) {

    return this.http.get(
      `${this.apiService.BASE_URL}/rooms/available`,
      {
        params: {
          checkInDate,
          checkOutDate,
          roomType
        }
      }
    );
  }

}