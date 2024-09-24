// src/pending-registration/pending-registration.module.ts
import { Module } from '@nestjs/common';
import { PendingRegistrationService } from './pending-registration.service';

@Module({
  providers: [PendingRegistrationService],
  exports: [PendingRegistrationService],  // Export so it can be used in other modules
})
export class PendingRegistrationModule {}
