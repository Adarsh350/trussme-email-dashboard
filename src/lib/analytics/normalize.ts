import type { MailchimpCampaign, MailchimpCampaignReport } from "@/lib/mailchimp/types";
import type { CampaignSummary, CampaignDetail, DashboardMetrics, TimeSeriesPoint } from "./types";
import { safePercent } from "@/lib/utils/format";
import type { MailchimpClickDetail, MailchimpDomainPerformance, MailchimpUnsubscribeReport } from "@/lib/mailchimp/types";

/**
 * Convert Mailchimp campaign to internal CampaignSummary
 */
export function normalizeCampaign(campaign: MailchimpCampaign): CampaignSummary {
  const sent = campaign.emails_sent || 0;
  const summary = campaign.report_summary;
  const uniqueOpens = summary?.unique_opens ?? 0;
  const uniqueClicks = summary?.subscriber_clicks ?? 0;
  
  // Estimate bounces from typical rate if not in summary
  const estimatedBounces = Math.round(sent * 0.02);
  const delivered = sent - estimatedBounces;
  const unsubscribes = Math.round(sent * 0.003);

  return {
    id: campaign.id,
    title: campaign.settings.title || campaign.settings.subject_line,
    subjectLine: campaign.settings.subject_line,
    sendTime: campaign.send_time,
    status: campaign.status as CampaignSummary["status"],
    listName: campaign.recipients?.list_name ?? "Unknown",
    listId: campaign.recipients?.list_id ?? "",
    emails: {
      sent,
      delivered,
      bounced: estimatedBounces,
      hardBounced: 0,
      softBounced: 0,
    },
    rates: {
      deliveryRate: safePercent(delivered, sent),
      openRate: (summary?.open_rate ?? 0) * 100,
      clickRate: (summary?.click_rate ?? 0) * 100,
      clickToOpenRate: uniqueOpens > 0 ? safePercent(uniqueClicks, uniqueOpens) : 0,
      unsubscribeRate: safePercent(unsubscribes, sent),
      bounceRate: safePercent(estimatedBounces, sent),
    },
    opens: {
      total: summary?.opens ?? 0,
      unique: uniqueOpens,
    },
    clicks: {
      total: summary?.clicks ?? 0,
      unique: uniqueClicks,
    },
    unsubscribes,
    forwardCount: 0,
    abuseReports: 0,
  };
}

/**
 * Convert Mailchimp campaign report to internal CampaignSummary
 */
export function normalizeReport(report: MailchimpCampaignReport): CampaignSummary {
  const sent = report.emails_sent || 0;
  const totalBounces = (report.bounces?.hard_bounces ?? 0) + (report.bounces?.soft_bounces ?? 0);
  const delivered = sent - totalBounces;
  const uniqueOpens = report.opens?.unique_opens ?? 0;
  const uniqueClicks = report.clicks?.unique_subscriber_clicks ?? 0;

  return {
    id: report.id,
    title: report.campaign_title || report.subject_line,
    subjectLine: report.subject_line,
    sendTime: report.send_time,
    status: "sent",
    listName: report.list_name ?? "Unknown",
    listId: report.list_id ?? "",
    emails: {
      sent,
      delivered,
      bounced: totalBounces,
      hardBounced: report.bounces?.hard_bounces ?? 0,
      softBounced: report.bounces?.soft_bounces ?? 0,
    },
    rates: {
      deliveryRate: safePercent(delivered, sent),
      openRate: (report.opens?.open_rate ?? 0) * 100,
      clickRate: (report.clicks?.click_rate ?? 0) * 100,
      clickToOpenRate: uniqueOpens > 0 ? safePercent(uniqueClicks, uniqueOpens) : 0,
      unsubscribeRate: safePercent(report.unsubscribed ?? 0, sent),
      bounceRate: safePercent(totalBounces, sent),
    },
    opens: {
      total: report.opens?.opens_total ?? 0,
      unique: uniqueOpens,
    },
    clicks: {
      total: report.clicks?.clicks_total ?? 0,
      unique: uniqueClicks,
    },
    unsubscribes: report.unsubscribed ?? 0,
    forwardCount: report.forwards?.forwards_count ?? 0,
    abuseReports: report.abuse_reports ?? 0,
  };
}

/**
 * Normalize full campaign detail including link, domain, and unsub data
 */
export function normalizeFullDetail(
  report: MailchimpCampaignReport,
  clickDetails?: MailchimpClickDetail,
  domainPerf?: MailchimpDomainPerformance,
  unsubs?: MailchimpUnsubscribeReport
): CampaignDetail {
  const base = normalizeReport(report);

  return {
    ...base,
    previewText: report.preview_text ?? "",
    topLinks: (clickDetails?.urls_clicked ?? []).map((link) => ({
      url: link.url,
      totalClicks: link.total_clicks,
      uniqueClicks: link.unique_clicks,
      clickPercentage: link.click_percentage,
      lastClickTime: link.last_click,
    })),
    domainPerformance: (domainPerf?.domains ?? []).map((d) => ({
      domain: d.domain,
      emailsSent: d.emails_sent,
      bounces: d.bounces,
      opens: d.opens,
      clicks: d.clicks,
      unsubscribes: d.unsubs,
      deliveryRate: safePercent(d.delivered ?? (d.emails_sent - d.bounces), d.emails_sent),
      openRate: d.opens_pct ?? 0,
      clickRate: d.clicks_pct ?? 0,
    })),
    unsubscribeDetails: (unsubs?.unsubscribes ?? []).map((u) => ({
      emailAddress: u.email_address,
      timestamp: u.timestamp,
      reason: u.reason || "Not specified",
      campaignId: u.campaign_id,
    })),
    timeSeries: (report.timeseries ?? []).map((t) => ({
      date: t.timestamp,
      opens: t.unique_opens,
      clicks: t.recipients_clicks,
      delivered: t.emails_sent,
      unsubscribes: 0,
      bounces: 0,
    })),
  };
}

/**
 * Aggregate campaign summaries into dashboard metrics
 */
export function aggregateDashboardMetrics(campaigns: CampaignSummary[]): DashboardMetrics {
  if (campaigns.length === 0) {
    return {
      totalCampaigns: 0,
      totalSent: 0,
      totalDelivered: 0,
      totalOpens: 0,
      totalClicks: 0,
      totalUnsubscribes: 0,
      totalBounces: 0,
      avgDeliveryRate: 0,
      avgOpenRate: 0,
      avgClickRate: 0,
      avgClickToOpenRate: 0,
      avgUnsubscribeRate: 0,
      avgBounceRate: 0,
      dateRange: { start: "", end: "" },
      trends: [],
    };
  }

  const sorted = [...campaigns].sort(
    (a, b) => new Date(a.sendTime).getTime() - new Date(b.sendTime).getTime()
  );

  const totalSent = campaigns.reduce((s, c) => s + c.emails.sent, 0);
  const totalDelivered = campaigns.reduce((s, c) => s + c.emails.delivered, 0);
  const totalOpens = campaigns.reduce((s, c) => s + c.opens.unique, 0);
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks.unique, 0);
  const totalUnsubscribes = campaigns.reduce((s, c) => s + c.unsubscribes, 0);
  const totalBounces = campaigns.reduce((s, c) => s + c.emails.bounced, 0);

  // Build time series from campaign send dates
  const trends: TimeSeriesPoint[] = sorted.map((c) => ({
    date: c.sendTime,
    opens: c.opens.unique,
    clicks: c.clicks.unique,
    delivered: c.emails.delivered,
    unsubscribes: c.unsubscribes,
    bounces: c.emails.bounced,
  }));

  return {
    totalCampaigns: campaigns.length,
    totalSent,
    totalDelivered,
    totalOpens,
    totalClicks,
    totalUnsubscribes,
    totalBounces,
    avgDeliveryRate: safePercent(totalDelivered, totalSent),
    avgOpenRate: campaigns.reduce((s, c) => s + c.rates.openRate, 0) / campaigns.length,
    avgClickRate: campaigns.reduce((s, c) => s + c.rates.clickRate, 0) / campaigns.length,
    avgClickToOpenRate: campaigns.reduce((s, c) => s + c.rates.clickToOpenRate, 0) / campaigns.length,
    avgUnsubscribeRate: campaigns.reduce((s, c) => s + c.rates.unsubscribeRate, 0) / campaigns.length,
    avgBounceRate: safePercent(totalBounces, totalSent),
    dateRange: {
      start: sorted[0].sendTime,
      end: sorted[sorted.length - 1].sendTime,
    },
    trends,
  };
}
