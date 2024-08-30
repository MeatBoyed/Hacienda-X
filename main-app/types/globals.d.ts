export {};

// Create a type for the roles
export type Roles = "admin" | "agent" | "viewer";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
