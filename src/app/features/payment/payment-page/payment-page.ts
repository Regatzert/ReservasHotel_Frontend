import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../core/services/payment.service';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from "../payment-form/payment-form";

@Component({
  selector: 'app-payment-page',
  imports: [PaymentForm],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css',
})
export class PaymentPage implements OnInit{
  bookingReference = '';

  amount = 0;

  clientSecret = '';

  error = '';

  paymentStatus: string | null = null;

  stripePromise =
    loadStripe('pk_test_XXXX');

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.bookingReference =
      this.route.snapshot.paramMap.get(
        'bookingReference'
      ) || '';

    this.amount =
      Number(
        this.route.snapshot.paramMap.get(
          'amount'
        )
      );

    this.fetchClientSecret();
  }

  fetchClientSecret(): void {

    const body = {
      bookingReference:
        this.bookingReference,

      amount: this.amount
    };

    this.paymentService
      .proceedForPayment(body)
      .subscribe({

        next: (resp: any) => {

          this.clientSecret =
            resp;
        },

        error: (err) => {

          this.error =
            err.error?.message || err.message;
        }
      });
  }

  handlePaymentStatus(
    status: string,
    transactionId = '',
    failureReason = ''
  ): void {

    const body = {

      bookingReference:
        this.bookingReference,

      amount: this.amount,

      transactionId,

      success: status === 'succeeded',

      failureReason
    };

    this.paymentService
      .updateBookingPayment(body)
      .subscribe();
  }

  onSuccess(transactionId: string): void {

    this.paymentStatus = 'succeeded';

    this.handlePaymentStatus(
      'succeeded',
      transactionId
    );

    this.router.navigate([
      '/payment-success',
      this.bookingReference
    ]);
  }

  onError(error: string): void {

    this.paymentStatus = 'failed';

    this.handlePaymentStatus(
      'failed',
      '',
      error
    );

    this.router.navigate([
      '/payment-failed',
      this.bookingReference
    ]);
  }
}
