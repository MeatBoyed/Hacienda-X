export {};

// Create a type for the roles
export type Roles = "admin" | "agent" | "viewer";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }

  interface RequestService<T> {
    static getAll(): Promise<T | null>;
    static create(data: T): Promise<T>;
    static delete(id: string): Promise<void>;
    static get(id: string): Promise<T | null>;
    static update(id: string, data: T): Promise<T>;
  }
}
