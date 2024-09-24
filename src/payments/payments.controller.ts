// src/payments/payments.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() body: { amount: number; currency: string; paymentMethodId: string }) {
    const { amount, currency, paymentMethodId } = body;

    // Ensure the amount is in cents (for example, $10.00 should be 1000)
    return this.paymentsService.createPayment(amount * 100, currency, paymentMethodId);
  }
}
