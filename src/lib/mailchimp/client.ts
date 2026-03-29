import { env } from "@/lib/env";
import type { MailchimpApiError } from "./types";

export class MailchimpApiException extends Error {
  status: number;
  detail: string;

  constructor(error: MailchimpApiError) {
    super(error.title);
    this.status = error.status;
    this.detail = error.detail;
  }
}

class MailchimpClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.apiKey = env.MAILCHIMP_API_KEY;
    this.baseUrl = `https://${env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0`;
  }

  private get headers(): HeadersInit {
    return {
      Authorization: `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    };
  }

  async get<T>(path: string, params?: Record<string, string | number>): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: this.headers,
      next: { revalidate: 300 }, // 5 minutes cache
    });

    if (!response.ok) {
      const error = (await response.json()) as MailchimpApiError;
      throw new MailchimpApiException(error);
    }

    return response.json() as Promise<T>;
  }
}

let clientInstance: MailchimpClient | null = null;

export function getMailchimpClient(): MailchimpClient {
  if (!clientInstance) {
    clientInstance = new MailchimpClient();
  }
  return clientInstance;
}
