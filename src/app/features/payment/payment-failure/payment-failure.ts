import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-failure',
  imports: [],
  templateUrl: './payment-failure.html',
  styleUrl: './payment-failure.css',
})
export class PaymentFailure implements OnInit{
  bookingReference = '';

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookingReference =
      this.route.snapshot.paramMap.get('bookingReference') || '';
  }
}
