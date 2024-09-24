// src/pending-registration/pending-registration.service.ts

import { Injectable } from '@nestjs/common';
import { PendingRegistration } from './pending-registration.interface';

@Injectable()
export class PendingRegistrationService {
  private pendingRegistrations = new Map<string, PendingRegistration>();

  // Add registration to pending map
  addPendingRegistration(email: string, data: PendingRegistration): void {
    this.pendingRegistrations.set(email, data);
  }

  // Get registration by email
  getPendingRegistration(email: string): PendingRegistration | undefined {
    return this.pendingRegistrations.get(email);
  }

  // Remove registration after successful verification
  removePendingRegistration(email: string): void {
    this.pendingRegistrations.delete(email);
  }

  // Check if the registration is pending
  hasPendingRegistration(email: string): boolean {
    return this.pendingRegistrations.has(email);
  }

  // Optional: Get all pending registrations (for debugging)
  getAllPendingRegistrations(): string[] {
    return Array.from(this.pendingRegistrations.keys());
  }
}
