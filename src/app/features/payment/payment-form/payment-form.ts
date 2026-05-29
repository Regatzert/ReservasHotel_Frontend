import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { NgxStripeModule, StripeCardComponent, StripeService } from 'ngx-stripe';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment-form',
  imports: [CommonModule, NgxStripeModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css',
})
export class PaymentForm {
  @Input()
  clientSecret!: string;

  @Input()
  amount!: number;

  @Output()
  paymentSuccess = new EventEmitter<string>();

  @Output()
  paymentError = new EventEmitter<string>();

  @ViewChild(StripeCardComponent)
  card!: StripeCardComponent;

  processing = false;

  error: string | null = null;

  succeeded = false;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontSize: '16px'
      }
    }
  };

  constructor(
    private stripeService: StripeService
  ) {}

  async handleSubmit(): Promise<void> {

    if (this.processing) return;

    this.processing = true;

    // Validación defensiva del card element
    if (!this.card) {
      const errorMessage = 'Card element not initialized';

      this.error = errorMessage;
      this.processing = false;
      this.paymentError.emit(errorMessage);

      return;
    }

    const result = await firstValueFrom(
      this.stripeService.confirmCardPayment(
        this.clientSecret,
        {
          payment_method: {
            card: this.card.element
          }
        }
      )
    );

    // Error de Stripe
    if (result.error) {

      const errorMessage = result.error.message ?? 'Unknown error';

      this.error = errorMessage;
      this.processing = false;

      this.paymentError.emit(errorMessage);

      return;
    }

    // Pago exitoso
    if (result.paymentIntent?.status === 'succeeded') {

      this.succeeded = true;
      this.processing = false;

      this.paymentSuccess.emit(result.paymentIntent.id);
      return;
    }

    // Caso raro: estado inesperado
    const errorMessage = 'Payment not completed';

    this.error = errorMessage;
    this.processing = false;

    this.paymentError.emit(errorMessage);
  }
}
