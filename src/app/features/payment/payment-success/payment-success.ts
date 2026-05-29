import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  imports: [],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css',
})
export class PaymentSuccess implements OnInit{
   bookingReference = '';

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookingReference =
      this.route.snapshot.paramMap.get('bookingReference') || '';
  }
}
