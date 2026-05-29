import { Component } from '@angular/core';
import { RoomSearch } from "../booking-rooms/room-search/room-search";
import { RoomResult } from "../booking-rooms/room-result/room-result";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [RoomSearch, RoomResult],
})
export class Home {
  roomSearchResult: any[] = [];

  handleSearchResult(results: any[]): void {

    this.roomSearchResult = results;

    console.log('RESULT IS:', results);
  }
}
