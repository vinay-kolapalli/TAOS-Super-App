import z from "zod";

export const env = z.object({
  // General
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_STORE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),

  // Google
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  // SMTP
  SMTP_HOST: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM: z.string(),

  // Cloudflare
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_R2_KEY_ID: z.string(),
  CLOUDFLARE_R2_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT: z.url(),

  // Shopify
  SHOPIFY_ACCESS_TOKEN: z.string(),

  // Parcel Panel
  PARCEL_PANEL_API_KEY: z.string(),

  // Shipping Integration
  SHIPROCKET_EMAIL: z.string(),
  SHIPROCKET_PASSWORD: z.string(),
  SHIPWAY_USERNAME: z.string(),
  SHIPWAY_PASSWORD: z.string(),
  SHIPHERE_API_KEY: z.string(),
  DELHIVERY_API_KEY: z.string(),
  FSHIP_API_KEY: z.string(),
  ITHINK_LOGISTICS_ACCESS_TOKEN: z.string(),
  ITHINK_LOGISTICS_SECRET_TOKEN: z.string(),
  AMAZON_SHIPPING_REFRESH_TOKEN: z.string(),
  AMAZON_SHIPPING_CLIENT_ID: z.string(),
  AMAZON_SHIPPING_CLIENT_SECRET: z.string(),

  // # Communication Services
  // PLIVO_AUTH_ID: z.string(),
  // PLIVO_AUTH_TOKEN: z.string(),
  // PLIVO_SOURCE_NUMBER: z.string(),
  // AIRTEL_DLT_ENTITY_ID: z.string(),
  // AIRTEL_SHIPPED_ORDER_TEMPLATE_ID: z.string(),
  // AIRTEL_NEW_ORDER_TEMPLATE_ID: z.string(),
  // FACEBOOK_TOKEN: z.string(),

  // Logger
  AXIOM_TOKEN: z.string(),
  AXIOM_DATASET: z.string(),
});

export type ZodEnv = z.infer<typeof env>;
