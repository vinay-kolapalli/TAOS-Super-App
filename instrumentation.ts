import { baseLogger } from "@/lib/logging/server";
import { createOnRequestError } from "@axiomhq/nextjs";

export const onRequestError = createOnRequestError(baseLogger);

export async function register() {
  await import("./lib/orpc/server");
}
