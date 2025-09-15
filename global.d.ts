import type { ZodEnv } from "./env";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ZodEnv {
      VERCEL_URL: string;
      NEXT_RUNTIME: "nodejs" | "edge";
    }
  }
}
