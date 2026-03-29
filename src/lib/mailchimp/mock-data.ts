import type {
  MailchimpCampaign,
  MailchimpCampaignReport,
  MailchimpClickDetail,
  MailchimpDomainPerformance,
  MailchimpUnsubscribeReport,
} from "./types";

// ============================================
// Realistic mock data for development
// ============================================

const MOCK_CAMPAIGNS: MailchimpCampaign[] = [
  {
    id: "camp_001",
    web_id: 1001,
    type: "regular",
    create_time: "2026-02-01T10:00:00+00:00",
    archive_url: "https://example.com/archive/1",
    long_archive_url: "https://example.com/archive/1",
    status: "sent",
    emails_sent: 12450,
    send_time: "2026-03-10T14:00:00+00:00",
    content_type: "html",
    recipients: {
      list_id: "list_001",
      list_is_active: true,
      list_name: "Main Newsletter",
      segment_text: "All subscribers",
      recipient_count: 12450,
    },
    settings: {
      subject_line: "March Product Updates — New Features Inside",
      preview_text: "See what's new this month",
      title: "March 2026 Newsletter",
      from_name: "Product Team",
      reply_to: "hello@company.com",
    },
    tracking: { opens: true, html_clicks: true, text_clicks: true },
    report_summary: {
      opens: 6890,
      unique_opens: 4200,
      open_rate: 0.337,
      clicks: 2100,
      subscriber_clicks: 1400,
      click_rate: 0.112,
    },
  },
  {
    id: "camp_002",
    web_id: 1002,
    type: "regular",
    create_time: "2026-02-15T09:00:00+00:00",
    archive_url: "https://example.com/archive/2",
    long_archive_url: "https://example.com/archive/2",
    status: "sent",
    emails_sent: 11800,
    send_time: "2026-03-03T10:30:00+00:00",
    content_type: "html",
    recipients: {
      list_id: "list_001",
      list_is_active: true,
      list_name: "Main Newsletter",
      segment_text: "Active subscribers",
      recipient_count: 11800,
    },
    settings: {
      subject_line: "Your Weekly Digest — Top Stories This Week",
      preview_text: "The best reads curated for you",
      title: "Weekly Digest #47",
      from_name: "Content Team",
      reply_to: "hello@company.com",
    },
    tracking: { opens: true, html_clicks: true, text_clicks: true },
    report_summary: {
      opens: 5820,
      unique_opens: 3750,
      open_rate: 0.318,
      clicks: 1650,
      subscriber_clicks: 1200,
      click_rate: 0.102,
    },
  },
  {
    id: "camp_003",
    web_id: 1003,
    type: "regular",
    create_time: "2026-02-20T11:00:00+00:00",
    archive_url: "https://example.com/archive/3",
    long_archive_url: "https://example.com/archive/3",
    status: "sent",
    emails_sent: 8200,
    send_time: "2026-02-25T09:00:00+00:00",
    content_type: "html",
    recipients: {
      list_id: "list_002",
      list_is_active: true,
      list_name: "Product Updates",
      segment_text: "Premium subscribers",
      recipient_count: 8200,
    },
    settings: {
      subject_line: "Exclusive: Early Access to Our New Platform",
      preview_text: "Be the first to try it",
      title: "Platform Launch Announcement",
      from_name: "CEO",
      reply_to: "ceo@company.com",
    },
    tracking: { opens: true, html_clicks: true, text_clicks: true },
    report_summary: {
      opens: 5400,
      unique_opens: 3900,
      open_rate: 0.476,
      clicks: 2800,
      subscriber_clicks: 2100,
      click_rate: 0.256,
    },
  },
  {
    id: "camp_004",
    web_id: 1004,
    type: "regular",
    create_time: "2026-01-20T08:00:00+00:00",
    archive_url: "https://example.com/archive/4",
    long_archive_url: "https://example.com/archive/4",
    status: "sent",
    emails_sent: 15200,
    send_time: "2026-02-14T08:00:00+00:00",
    content_type: "html",
    recipients: {
      list_id: "list_001",
      list_is_active: true,
      list_name: "Main Newsletter",
      segment_text: "All subscribers",
      recipient_count: 15200,
    },
    settings: {
      subject_line: "Valentine's Day Special — 30% Off Everything",
      preview_text: "Love is in the air, and so are savings",
      title: "Valentine's Day Promo",
      from_name: "Marketing Team",
      reply_to: "deals@company.com",
    },
    tracking: { opens: true, html_clicks: true, text_clicks: true },
    report_summary: {
      opens: 8300,
      unique_opens: 5600,
      open_rate: 0.368,
      clicks: 3900,
      subscriber_clicks: 2800,
      click_rate: 0.184,
    },
  },
  {
    id: "camp_005",
    web_id: 1005,
    type: "regular",
    create_time: "2026-01-10T10:00:00+00:00",
    archive_url: "https://example.com/archive/5",
    long_archive_url: "https://example.com/archive/5",
    status: "sent",
    emails_sent: 13100,
    send_time: "2026-02-01T11:00:00+00:00",
    content_type: "html",
    recipients: {
      list_id: "list_001",
      list_is_active: true,
      list_name: "Main Newsletter",
      segment_text: "Engaged subscribers",
      recipient_count: 13100,
    },
    settings: {
      subject_line: "February Kickoff — What's Coming This Month",
      preview_text: "Big things ahead",
      title: "February Kickoff",
      from_name: "Product Team",
      reply_to: "hello@company.com",
    },
    tracking: { opens: true, html_clicks: true, text_clicks: true },
    report_summary: {
      opens: 5200,
      unique_opens: 3400,
      open_rate: 0.26,
      clicks: 1300,
      subscriber_clicks: 980,
      click_rate: 0.075,
    },
  },
  {
    id: "camp_006",
    web_id: 1006,
    type: "regular",
    create_time: "2026-01-05T09:00:00+00:00",
    archive_url: "https://example.com/archive/6",
    long_archive_url: "https://example.com/archive/6",
    status: "sent",
    emails_sent: 14500,
    send_time: "2026-01-15T10:00:00+00:00",
    content_type: "html",
    recipients: {
      list_id: "list_001",
      list_is_active: true,
      list_name: "Main Newsletter",
      segment_text: "All subscribers",
      recipient_count: 14500,
    },
    settings: {
      subject_line: "New Year, New Features — 2026 Roadmap Revealed",
      preview_text: "See what we're building",
      title: "2026 Roadmap",
      from_name: "CTO",
      reply_to: "tech@company.com",
    },
    tracking: { opens: true, html_clicks: true, text_clicks: true },
    report_summary: {
      opens: 7800,
      unique_opens: 5100,
      open_rate: 0.352,
      clicks: 3200,
      subscriber_clicks: 2400,
      click_rate: 0.166,
    },
  },
  {
    id: "camp_007",
    web_id: 1007,
    type: "regular",
    create_time: "2025-12-20T10:00:00+00:00",
    archive_url: "https://example.com/archive/7",
    long_archive_url: "https://example.com/archive/7",
    status: "sent",
    emails_sent: 16800,
    send_time: "2025-12-23T09:00:00+00:00",
    content_type: "html",
    recipients: {
      list_id: "list_001",
      list_is_active: true,
      list_name: "Main Newsletter",
      segment_text: "All subscribers",
      recipient_count: 16800,
    },
    settings: {
      subject_line: "Holiday Special — Year in Review + Exclusive Offers",
      preview_text: "Thank you for an incredible year",
      title: "Holiday Campaign 2025",
      from_name: "CEO",
      reply_to: "hello@company.com",
    },
    tracking: { opens: true, html_clicks: true, text_clicks: true },
    report_summary: {
      opens: 9200,
      unique_opens: 6300,
      open_rate: 0.375,
      clicks: 4100,
      subscriber_clicks: 3100,
      click_rate: 0.185,
    },
  },
  {
    id: "camp_008",
    web_id: 1008,
    type: "regular",
    create_time: "2025-12-10T08:00:00+00:00",
    archive_url: "https://example.com/archive/8",
    long_archive_url: "https://example.com/archive/8",
    status: "sent",
    emails_sent: 9500,
    send_time: "2025-12-12T14:00:00+00:00",
    content_type: "html",
    recipients: {
      list_id: "list_002",
      list_is_active: true,
      list_name: "Product Updates",
      segment_text: "Beta users",
      recipient_count: 9500,
    },
    settings: {
      subject_line: "Beta Program Update — New Dashboard is Live",
      preview_text: "Your feedback shaped this release",
      title: "Beta Update Dec 2025",
      from_name: "Product Team",
      reply_to: "beta@company.com",
    },
    tracking: { opens: true, html_clicks: true, text_clicks: true },
    report_summary: {
      opens: 4800,
      unique_opens: 3200,
      open_rate: 0.337,
      clicks: 2100,
      subscriber_clicks: 1600,
      click_rate: 0.168,
    },
  },
];

function createMockReport(campaign: MailchimpCampaign): MailchimpCampaignReport {
  const summary = campaign.report_summary!;
  const sent = campaign.emails_sent;
  const hardBounces = Math.round(sent * 0.008);
  const softBounces = Math.round(sent * 0.012);

  return {
    id: campaign.id,
    campaign_title: campaign.settings.title,
    type: campaign.type,
    list_id: campaign.recipients.list_id,
    list_is_active: campaign.recipients.list_is_active,
    list_name: campaign.recipients.list_name,
    subject_line: campaign.settings.subject_line,
    preview_text: campaign.settings.preview_text,
    emails_sent: sent,
    abuse_reports: Math.round(sent * 0.0001),
    unsubscribed: Math.round(sent * 0.003),
    send_time: campaign.send_time,
    forwards: {
      forwards_count: Math.round(summary.unique_opens * 0.02),
      forwards_opens: Math.round(summary.unique_opens * 0.005),
    },
    opens: {
      opens_total: summary.opens,
      unique_opens: summary.unique_opens,
      open_rate: summary.open_rate,
      last_open: new Date(new Date(campaign.send_time).getTime() + 72 * 3600000).toISOString(),
    },
    clicks: {
      clicks_total: summary.clicks,
      unique_clicks: summary.subscriber_clicks,
      unique_subscriber_clicks: summary.subscriber_clicks,
      click_rate: summary.click_rate,
      last_click: new Date(new Date(campaign.send_time).getTime() + 48 * 3600000).toISOString(),
    },
    bounces: {
      hard_bounces: hardBounces,
      soft_bounces: softBounces,
      syntax_errors: Math.round(sent * 0.001),
    },
    list_stats: {
      sub_rate: 2.1,
      unsub_rate: 0.3,
      open_rate: 32.5,
      click_rate: 14.2,
    },
    timeseries: generateTimeSeries(campaign.send_time, sent, summary.unique_opens, summary.subscriber_clicks),
  };
}

function generateTimeSeries(
  sendTime: string,
  sent: number,
  opens: number,
  clicks: number
): MailchimpCampaignReport["timeseries"] {
  const points: MailchimpCampaignReport["timeseries"] = [];
  const start = new Date(sendTime);
  
  // Simulate 24 hours of activity in 1-hour intervals
  for (let h = 0; h < 24; h++) {
    const ts = new Date(start.getTime() + h * 3600000);
    // Decay curve: most activity in first few hours
    const factor = Math.exp(-h * 0.15);
    points.push({
      timestamp: ts.toISOString(),
      emails_sent: h === 0 ? sent : 0,
      unique_opens: Math.round(opens * factor * 0.12),
      recipients_clicks: Math.round(clicks * factor * 0.1),
    });
  }
  return points;
}

export function getMockCampaigns(): MailchimpCampaign[] {
  return MOCK_CAMPAIGNS;
}

export function getMockCampaignReport(campaignId: string): MailchimpCampaignReport {
  const campaign = MOCK_CAMPAIGNS.find((c) => c.id === campaignId);
  if (!campaign) {
    return createMockReport(MOCK_CAMPAIGNS[0]);
  }
  return createMockReport(campaign);
}

export function getMockClickDetails(campaignId: string): MailchimpClickDetail {
  const links = [
    { url: "https://company.com/product", label: "Main CTA" },
    { url: "https://company.com/blog/latest-post", label: "Blog Post" },
    { url: "https://company.com/pricing", label: "Pricing Page" },
    { url: "https://company.com/demo", label: "Book a Demo" },
    { url: "https://company.com/case-studies", label: "Case Studies" },
    { url: "https://company.com/webinar", label: "Upcoming Webinar" },
    { url: "https://company.com/docs", label: "Documentation" },
  ];

  const campaign = MOCK_CAMPAIGNS.find((c) => c.id === campaignId) ?? MOCK_CAMPAIGNS[0];
  const totalClicks = campaign.report_summary?.clicks ?? 1000;

  return {
    urls_clicked: links.map((link, i) => {
      const factor = Math.pow(0.55, i);
      const clicks = Math.round(totalClicks * factor * 0.4);
      return {
        id: `link_${i}`,
        url: link.url,
        total_clicks: clicks,
        click_percentage: (clicks / totalClicks) * 100,
        unique_clicks: Math.round(clicks * 0.75),
        unique_click_percentage: 0,
        last_click: new Date(new Date(campaign.send_time).getTime() + 48 * 3600000).toISOString(),
        campaign_id: campaignId,
      };
    }),
    campaign_id: campaignId,
    total_items: links.length,
  };
}

export function getMockDomainPerformance(campaignId: string): MailchimpDomainPerformance {
  const campaign = MOCK_CAMPAIGNS.find((c) => c.id === campaignId) ?? MOCK_CAMPAIGNS[0];
  const sent = campaign.emails_sent;

  const domains = [
    { domain: "gmail.com", pct: 0.42 },
    { domain: "yahoo.com", pct: 0.15 },
    { domain: "outlook.com", pct: 0.13 },
    { domain: "hotmail.com", pct: 0.08 },
    { domain: "icloud.com", pct: 0.06 },
    { domain: "aol.com", pct: 0.04 },
    { domain: "protonmail.com", pct: 0.03 },
    { domain: "other", pct: 0.09 },
  ];

  return {
    domains: domains.map((d) => {
      const domainSent = Math.round(sent * d.pct);
      const bounces = Math.round(domainSent * 0.02);
      const delivered = domainSent - bounces;
      const opens = Math.round(delivered * (0.28 + Math.random() * 0.15));
      const clicks = Math.round(opens * (0.25 + Math.random() * 0.15));
      return {
        domain: d.domain,
        emails_sent: domainSent,
        bounces,
        opens,
        clicks,
        unsubs: Math.round(domainSent * 0.003),
        delivered,
        emails_pct: d.pct * 100,
        bounces_pct: (bounces / domainSent) * 100,
        opens_pct: (opens / delivered) * 100,
        clicks_pct: (clicks / delivered) * 100,
        unsubs_pct: 0.3,
      };
    }),
    campaign_id: campaignId,
    total_sent: sent,
    total_items: domains.length,
  };
}

export function getMockUnsubscribeReport(campaignId: string): MailchimpUnsubscribeReport {
  const campaign = MOCK_CAMPAIGNS.find((c) => c.id === campaignId) ?? MOCK_CAMPAIGNS[0];
  const unsubCount = Math.round(campaign.emails_sent * 0.003);

  const reasons = [
    "No longer interested",
    "Too many emails",
    "Content not relevant",
    "Didn't sign up",
    "Other",
  ];

  const unsubscribes = Array.from({ length: Math.min(unsubCount, 10) }, (_, i) => ({
    email_id: `unsub_${i}`,
    email_address: `user${i + 1}@example.com`,
    merge_fields: {},
    timestamp: new Date(
      new Date(campaign.send_time).getTime() + (i + 1) * 3600000
    ).toISOString(),
    reason: reasons[i % reasons.length],
    campaign_id: campaignId,
    list_id: campaign.recipients.list_id,
    list_is_active: true,
  }));

  return {
    unsubscribes,
    campaign_id: campaignId,
    total_items: unsubCount,
  };
}
