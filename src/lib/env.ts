import { z } from "zod";

const envSchema = z.object({
  MAILCHIMP_API_KEY: z.string().optional().default(""),
  MAILCHIMP_SERVER_PREFIX: z.string().optional().default("us21"),
  DASHBOARD_PASSWORD: z.string().optional().default(""),
});

function getEnvConfig() {
  const parsed = envSchema.safeParse({
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    MAILCHIMP_SERVER_PREFIX: process.env.MAILCHIMP_SERVER_PREFIX,
    DASHBOARD_PASSWORD: process.env.DASHBOARD_PASSWORD,
  });

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten());
    return {
      MAILCHIMP_API_KEY: "",
      MAILCHIMP_SERVER_PREFIX: "us21",
      DASHBOARD_PASSWORD: "",
      isConfigured: false,
    };
  }

  return {
    ...parsed.data,
    isConfigured: parsed.data.MAILCHIMP_API_KEY.length > 0,
  };
}

export const env = getEnvConfig();

export function isMailchimpConfigured(): boolean {
  return env.MAILCHIMP_API_KEY.length > 0;
}
