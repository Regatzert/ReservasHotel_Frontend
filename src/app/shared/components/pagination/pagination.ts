import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  @Input() roomPerPage = 0;

  @Input() totalRooms = 0;

  @Input() currentPage = 1;

  @Output() pageChange =
    new EventEmitter<number>();

  get pages(): number[] {

    return Array.from(
      {
        length: Math.ceil(
          this.totalRooms / this.roomPerPage
        )
      },
      (_, i) => i + 1
    );
  }
}
