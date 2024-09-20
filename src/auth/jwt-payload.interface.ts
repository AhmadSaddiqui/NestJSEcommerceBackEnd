// src/auth/jwt-payload.interface.ts
export interface JwtPayload {
  id: string; // User ID
  email: string; // User email
  role: string; // User role (admin, seller, buyer)
}
