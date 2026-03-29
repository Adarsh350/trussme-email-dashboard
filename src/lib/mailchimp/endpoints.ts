import { getMailchimpClient } from "./client";
import { isMailchimpConfigured } from "@/lib/env";
import { getMockCampaigns, getMockCampaignReport, getMockClickDetails, getMockDomainPerformance, getMockUnsubscribeReport } from "./mock-data";
import type {
  MailchimpCampaign,
  MailchimpCampaignReport,
  MailchimpClickDetail,
  MailchimpDomainPerformance,
  MailchimpUnsubscribeReport,
} from "./types";

interface CampaignListParams {
  count?: number;
  offset?: number;
  status?: string;
  sinceSendTime?: string;
  beforeSendTime?: string;
  sortField?: string;
  sortDir?: string;
}

/**
 * Fetch campaign list from Mailchimp
 */
export async function getCampaigns(params: CampaignListParams = {}): Promise<{
  campaigns: MailchimpCampaign[];
  totalItems: number;
}> {
  if (!isMailchimpConfigured()) {
    const mocks = getMockCampaigns();
    return { campaigns: mocks, totalItems: mocks.length };
  }

  const client = getMailchimpClient();
  
  const queryParams: Record<string, string | number> = {
    count: params.count ?? 100,
    offset: params.offset ?? 0,
    sort_field: params.sortField ?? "send_time",
    sort_dir: params.sortDir ?? "DESC",
    status: "sent",
  };

  if (params.sinceSendTime) {
    queryParams.since_send_time = params.sinceSendTime;
  }
  if (params.beforeSendTime) {
    queryParams.before_send_time = params.beforeSendTime;
  }

  const response = await client.get<{
    campaigns: MailchimpCampaign[];
    total_items: number;
  }>("/campaigns", queryParams);

  return {
    campaigns: response.campaigns ?? [],
    totalItems: response.total_items,
  };
}

/**
 * Fetch campaign report from Mailchimp
 */
export async function getCampaignReport(campaignId: string): Promise<MailchimpCampaignReport> {
  if (!isMailchimpConfigured()) {
    return getMockCampaignReport(campaignId);
  }

  const client = getMailchimpClient();
  return client.get<MailchimpCampaignReport>(`/reports/${campaignId}`);
}

/**
 * Fetch click details for a campaign
 */
export async function getCampaignClickDetails(campaignId: string): Promise<MailchimpClickDetail> {
  if (!isMailchimpConfigured()) {
    return getMockClickDetails(campaignId);
  }

  const client = getMailchimpClient();
  return client.get<MailchimpClickDetail>(`/reports/${campaignId}/click-details`, {
    count: 50,
  });
}

/**
 * Fetch domain performance for a campaign
 */
export async function getCampaignDomainPerformance(campaignId: string): Promise<MailchimpDomainPerformance> {
  if (!isMailchimpConfigured()) {
    return getMockDomainPerformance(campaignId);
  }

  const client = getMailchimpClient();
  return client.get<MailchimpDomainPerformance>(`/reports/${campaignId}/domain-performance`);
}

/**
 * Fetch unsubscribe report for a campaign
 */
export async function getCampaignUnsubscribes(campaignId: string): Promise<MailchimpUnsubscribeReport> {
  if (!isMailchimpConfigured()) {
    return getMockUnsubscribeReport(campaignId);
  }

  const client = getMailchimpClient();
  return client.get<MailchimpUnsubscribeReport>(`/reports/${campaignId}/unsubscribed`, {
    count: 100,
  });
}

/**
 * Fetch all campaign reports for dashboard aggregation
 */
export async function getAllCampaignReports(
  sinceSendTime?: string,
  beforeSendTime?: string
): Promise<MailchimpCampaignReport[]> {
  if (!isMailchimpConfigured()) {
    const mocks = getMockCampaigns();
    return Promise.all(mocks.map((c) => getMockCampaignReport(c.id)));
  }

  const client = getMailchimpClient();
  
  const params: Record<string, string | number> = {
    count: 100,
    offset: 0,
  };

  if (sinceSendTime) params.since_send_time = sinceSendTime;
  if (beforeSendTime) params.before_send_time = beforeSendTime;

  const response = await client.get<{
    reports: MailchimpCampaignReport[];
    total_items: number;
  }>("/reports", params);

  return response.reports ?? [];
}
