"use client";
import { useLogger } from "@/lib/logging/client";
import { useLayoutEffect } from "react";

export function ConsoleLogger() {
  const log = useLogger();

  useLayoutEffect(() => {
    const original = {
      warn: console.warn,
      error: console.error,
    };

    function override(originalFn: Function, logFn: Function, level: string, title: string) {
      return (...args: any[]) => {
        originalFn.apply(console, args);
        try {
          logFn(title, {
            data: {
              level,
              message: args.join(" "),
              timestamp: new Date().toISOString(),
              source: "browser_console",
            },
          });
        } catch (error) {
          originalFn.apply(console, ["Failed to log to custom logger:", error]);
        }
      };
    }

    console.warn = override(original.warn, log.warn, "warn", "Browser Console Warning");
    console.error = override(original.error, log.error, "error", "Browser Console Error");

    return () => {
      Object.assign(console, original);
    };
  }, [log]);

  return null;
}
