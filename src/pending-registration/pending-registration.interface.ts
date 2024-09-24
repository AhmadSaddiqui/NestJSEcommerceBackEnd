// src/pending-registration/pending-registration.interface.ts

export interface PendingRegistration {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    shopName: string;
    address: string;
    phoneNumber: string;
    role: string; // Optional: Include if you want to track the role
  }
  