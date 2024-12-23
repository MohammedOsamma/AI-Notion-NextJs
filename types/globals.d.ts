import { User } from "@clerk/nextjs/server";

export {};

declare global {
  interface CustomJwtSessionClaims extends User {}
}
