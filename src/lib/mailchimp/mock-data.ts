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
    "id": "camp_001",
    "web_id": 1000,
    "type": "regular",
    "create_time": "2026-03-27T16:38:12.114Z",
    "archive_url": "https://example.com/archive/1",
    "long_archive_url": "https://example.com/archive/1",
    "status": "sent",
    "emails_sent": 49622,
    "send_time": "2026-03-29T16:38:12.114Z",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Globals",
      "segment_text": "All active maritime clients",
      "recipient_count": 49622
    },
    "settings": {
      "subject_line": "So, here’s what’s changed since we last worked together",
      "preview_text": "Important updates from Master Systems",
      "title": "So, here’s what’s changed since we last worked together",
      "from_name": "Master Systems Comm",
      "reply_to": "info@mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 22675,
      "unique_opens": 19273,
      "open_rate": 0.4569624765395183,
      "clicks": 11452,
      "subscriber_clicks": 9734,
      "click_rate": 0.230801662782594
    }
  },
  {
    "id": "camp_002",
    "web_id": 1001,
    "type": "regular",
    "create_time": "2026-03-24T16:38:12.120Z",
    "archive_url": "https://example.com/archive/2",
    "long_archive_url": "https://example.com/archive/2",
    "status": "sent",
    "emails_sent": 50129,
    "send_time": "2026-03-26T16:38:12.120Z",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Globals",
      "segment_text": "All active maritime clients",
      "recipient_count": 50129
    },
    "settings": {
      "subject_line": "What if your equipment told you it was failing.. before it actually did?",
      "preview_text": "Important updates from Master Systems",
      "title": "What if your equipment told you it was failing.. before it actually did?",
      "from_name": "Master Systems Comm",
      "reply_to": "info@mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 31713,
      "unique_opens": 26956,
      "open_rate": 0.6326348070100096,
      "clicks": 12341,
      "subscriber_clicks": 10489,
      "click_rate": 0.2462042054523127
    }
  },
  {
    "id": "camp_003",
    "web_id": 1002,
    "type": "regular",
    "create_time": "2026-03-21T16:38:12.120Z",
    "archive_url": "https://example.com/archive/3",
    "long_archive_url": "https://example.com/archive/3",
    "status": "sent",
    "emails_sent": 53659,
    "send_time": "2026-03-23T16:38:12.120Z",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Globals",
      "segment_text": "All active maritime clients",
      "recipient_count": 53659
    },
    "settings": {
      "subject_line": "This holiday season we honor those who keep the world moving",
      "preview_text": "Important updates from Master Systems",
      "title": "This holiday season we honor those who keep the world moving",
      "from_name": "Master Systems Comm",
      "reply_to": "info@mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 27971,
      "unique_opens": 23775,
      "open_rate": 0.5212781422627988,
      "clicks": 9946,
      "subscriber_clicks": 8454,
      "click_rate": 0.18536927453608154
    }
  },
  {
    "id": "camp_004",
    "web_id": 1003,
    "type": "regular",
    "create_time": "2026-03-18T16:38:12.120Z",
    "archive_url": "https://example.com/archive/4",
    "long_archive_url": "https://example.com/archive/4",
    "status": "sent",
    "emails_sent": 49156,
    "send_time": "2026-03-20T16:38:12.120Z",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Globals",
      "segment_text": "All active maritime clients",
      "recipient_count": 49156
    },
    "settings": {
      "subject_line": "Important Update: Changes to HSSEQ Procedures for Enclosed Space Entry",
      "preview_text": "Important updates from Master Systems",
      "title": "Important Update: Changes to HSSEQ Procedures for Enclosed Space Entry",
      "from_name": "Master Systems Comm",
      "reply_to": "info@mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 26810,
      "unique_opens": 22788,
      "open_rate": 0.5454087023012357,
      "clicks": 12708,
      "subscriber_clicks": 10801,
      "click_rate": 0.258527121432001
    }
  },
  {
    "id": "camp_005",
    "web_id": 1004,
    "type": "regular",
    "create_time": "2026-03-15T16:38:12.120Z",
    "archive_url": "https://example.com/archive/5",
    "long_archive_url": "https://example.com/archive/5",
    "status": "sent",
    "emails_sent": 47776,
    "send_time": "2026-03-17T16:38:12.120Z",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Globals",
      "segment_text": "All active maritime clients",
      "recipient_count": 47776
    },
    "settings": {
      "subject_line": "Is Your CO2 Testing Compliant with IMO MSC.581(110)?",
      "preview_text": "Important updates from Master Systems",
      "title": "Is Your CO2 Testing Compliant with IMO MSC.581(110)?",
      "from_name": "Master Systems Comm",
      "reply_to": "info@mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 29471,
      "unique_opens": 25050,
      "open_rate": 0.6168655173483757,
      "clicks": 11533,
      "subscriber_clicks": 9803,
      "click_rate": 0.24140054521400262
    }
  },
  {
    "id": "camp_006",
    "web_id": 1005,
    "type": "regular",
    "create_time": "2026-03-12T16:38:12.120Z",
    "archive_url": "https://example.com/archive/6",
    "long_archive_url": "https://example.com/archive/6",
    "status": "sent",
    "emails_sent": 48809,
    "send_time": "2026-03-14T16:38:12.120Z",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Globals",
      "segment_text": "All active maritime clients",
      "recipient_count": 48809
    },
    "settings": {
      "subject_line": "Reliable Mobile Phones for Tough Environments",
      "preview_text": "Important updates from Master Systems",
      "title": "Reliable Mobile Phones for Tough Environments",
      "from_name": "Master Systems Comm",
      "reply_to": "info@mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 24833,
      "unique_opens": 21108,
      "open_rate": 0.508786719385677,
      "clicks": 10068,
      "subscriber_clicks": 8557,
      "click_rate": 0.2062873508730213
    }
  },
  {
    "id": "camp_007",
    "web_id": 1006,
    "type": "regular",
    "create_time": "2026-03-09T16:38:12.120Z",
    "archive_url": "https://example.com/archive/7",
    "long_archive_url": "https://example.com/archive/7",
    "status": "sent",
    "emails_sent": 58291,
    "send_time": "2026-03-11T16:38:12.120Z",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Globals",
      "segment_text": "All active maritime clients",
      "recipient_count": 58291
    },
    "settings": {
      "subject_line": "UPDATE: Introducing NSR's MED-DNV Certified Fiber Optic Gyro Compass Series",
      "preview_text": "Important updates from Master Systems",
      "title": "UPDATE: Introducing NSR's MED-DNV Certified Fiber Optic Gyro Compass Series",
      "from_name": "Master Systems Comm",
      "reply_to": "info@mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 32829,
      "unique_opens": 27904,
      "open_rate": 0.5631988587616327,
      "clicks": 14735,
      "subscriber_clicks": 12524,
      "click_rate": 0.2527999717857362
    }
  },
  {
    "id": "camp_008",
    "web_id": 1007,
    "type": "regular",
    "create_time": "2026-03-06T16:38:12.120Z",
    "archive_url": "https://example.com/archive/8",
    "long_archive_url": "https://example.com/archive/8",
    "status": "sent",
    "emails_sent": 57920,
    "send_time": "2026-03-08T16:38:12.120Z",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Globals",
      "segment_text": "All active maritime clients",
      "recipient_count": 57920
    },
    "settings": {
      "subject_line": "Upgrade Your Fleet's Emergency Response with ACR Emergency Equipment",
      "preview_text": "Important updates from Master Systems",
      "title": "Upgrade Your Fleet's Emergency Response with ACR Emergency Equipment",
      "from_name": "Master Systems Comm",
      "reply_to": "info@mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 37491,
      "unique_opens": 31867,
      "open_rate": 0.6472974660484342,
      "clicks": 11308,
      "subscriber_clicks": 9611,
      "click_rate": 0.19524935566148688
    }
  }
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
