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
    "id": "0e20bc6868",
    "web_id": 10124488,
    "type": "regular",
    "create_time": "2026-03-23T12:52:38+00:00",
    "archive_url": "http://eepurl.com/jCj9z2",
    "long_archive_url": "https://mailchi.mp/8a239851cb9e/so-heres-whats-changed-since-we-last-worked-together-10124488",
    "status": "sent",
    "emails_sent": 3119,
    "send_time": "2026-03-26T05:00:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 3119
    },
    "settings": {
      "subject_line": "Deploy gas detection in minutes - Honeywell MeshGuard Wireless Gas Detection System",
      "preview_text": "Plant shutdowns don't wait for complex installations.",
      "title": "Honeywell MeshGuard Wireless Gas Detection",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 702,
      "unique_opens": 575,
      "open_rate": 0.22535738959906168,
      "clicks": 262,
      "subscriber_clicks": 222,
      "click_rate": 0.08419634664541728
    }
  },
  {
    "id": "c372af687f",
    "web_id": 10124472,
    "type": "regular",
    "create_time": "2026-03-19T09:37:46+00:00",
    "archive_url": "http://eepurl.com/jB5oPw",
    "long_archive_url": "https://mailchi.mp/87d8e9a57a08/safe-passages-and-a-blessed-eid-from-our-team-to-yours",
    "status": "sent",
    "emails_sent": 3042,
    "send_time": "2026-03-19T11:31:42+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 3042
    },
    "settings": {
      "subject_line": "Safe Passages and a blessed Eid - From our team to yours.",
      "preview_text": "Master Systems wishes you a blessed Eid Al Fitr",
      "title": "EID Seasonal Campaign",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 1033,
      "unique_opens": 847,
      "open_rate": 0.33976847244540254,
      "clicks": 317,
      "subscriber_clicks": 269,
      "click_rate": 0.10423867829996852
    }
  },
  {
    "id": "3d177e045a",
    "web_id": 10124425,
    "type": "regular",
    "create_time": "2026-03-11T11:25:53+00:00",
    "archive_url": "http://eepurl.com/jBsdTk",
    "long_archive_url": "https://mailchi.mp/38fd59a96cae/in-stock-nsr-koden-gps-systems-ready-for-delivery",
    "status": "sent",
    "emails_sent": 2339,
    "send_time": "2026-03-12T05:30:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 2339
    },
    "settings": {
      "subject_line": "In Stock: NSR & Koden GPS Systems Ready for Delivery",
      "preview_text": "Secure your advanced GPS systems now for timely project completion.",
      "title": "ShipChandling Products",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 867,
      "unique_opens": 710,
      "open_rate": 0.3708131066035528,
      "clicks": 218,
      "subscriber_clicks": 185,
      "click_rate": 0.09343962527443787
    }
  },
  {
    "id": "bcbebf1bca",
    "web_id": 10124417,
    "type": "regular",
    "create_time": "2026-03-09T09:13:52+00:00",
    "archive_url": "http://eepurl.com/jBfIPA",
    "long_archive_url": "https://mailchi.mp/705046b3c736/so-heres-whats-changed-since-we-last-worked-together-10124417",
    "status": "sent",
    "emails_sent": 3571,
    "send_time": "2026-03-12T04:30:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 3571
    },
    "settings": {
      "subject_line": "New IMO Requirement: 5-Gas Detection Mandatory",
      "preview_text": "Get up to speed on the new 5 Gas detector mandate.",
      "title": "5 Gas compliance",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 1007,
      "unique_opens": 825,
      "open_rate": 0.2822676054449452,
      "clicks": 196,
      "subscriber_clicks": 166,
      "click_rate": 0.05493515598701221
    }
  },
  {
    "id": "c0732e05a4",
    "web_id": 10124322,
    "type": "regular",
    "create_time": "2026-02-18T09:04:07+00:00",
    "archive_url": "http://eepurl.com/jzKcg-/",
    "long_archive_url": "https://mailchi.mp/8c8bb85f9f86/so-heres-whats-changed-since-we-last-worked-together-10124322",
    "status": "sent",
    "emails_sent": 2846,
    "send_time": "2026-02-25T04:30:15+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 2846
    },
    "settings": {
      "subject_line": "Compliance documentation your crew needs - Breathing Air Monitoring",
      "preview_text": "Both regulators and safety auditors ask the same question - \"How do you verify your compressed breathing air is safe?\"",
      "title": "Oil and gas weekly",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 948,
      "unique_opens": 777,
      "open_rate": 0.33317155473628757,
      "clicks": 126,
      "subscriber_clicks": 107,
      "click_rate": 0.044353503867548244
    }
  },
  {
    "id": "580bc6ac91",
    "web_id": 10124323,
    "type": "regular",
    "create_time": "2026-02-18T10:22:12+00:00",
    "archive_url": "http://eepurl.com/jzKvUM",
    "long_archive_url": "https://mailchi.mp/beb94e829ce3/were-ready-for-you-your-lsa-services-when-you-need-it-most-10124323",
    "status": "sent",
    "emails_sent": 2685,
    "send_time": "2026-02-19T04:00:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 2685
    },
    "settings": {
      "subject_line": "In Stock and Ready for Immediate Delivery - The EEBD, By Shanghai Fangzhan",
      "preview_text": "When emergency evacuation seconds count, your crew needs reliable breathing protection.",
      "title": "ShipchandlingNew",
      "from_name": "Digital Marine Systems",
      "reply_to": "hello@discover-digitalmarinesystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 972,
      "unique_opens": 797,
      "open_rate": 0.3621888100429318,
      "clicks": 133,
      "subscriber_clicks": 113,
      "click_rate": 0.04962277126659994
    }
  },
  {
    "id": "6b7c90e17c",
    "web_id": 10124307,
    "type": "regular",
    "create_time": "2026-02-12T12:27:49+00:00",
    "archive_url": "http://eepurl.com/jziNR-/",
    "long_archive_url": "https://mailchi.mp/7205f7b6e188/were-ready-for-you-your-lsa-services-when-you-need-it-most",
    "status": "sent",
    "emails_sent": 3171,
    "send_time": "2026-02-18T04:30:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 3171
    },
    "settings": {
      "subject_line": "We’re ready for you - your LSA services, when you need it most",
      "preview_text": "When your vessel operates in African waters, you need an LSA service provider that actually understands the region",
      "title": "DMS1",
      "from_name": "Digital Marine Systems",
      "reply_to": "hello@discover-digitalmarinesystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 845,
      "unique_opens": 692,
      "open_rate": 0.2666335718864483,
      "clicks": 299,
      "subscriber_clicks": 254,
      "click_rate": 0.09431979986790744
    }
  },
  {
    "id": "fd77c74973",
    "web_id": 10124302,
    "type": "regular",
    "create_time": "2026-02-12T08:07:22+00:00",
    "archive_url": "http://eepurl.com/jzhyvE",
    "long_archive_url": "https://mailchi.mp/d59843678301/so-heres-whats-changed-since-we-last-worked-together-10124302",
    "status": "sent",
    "emails_sent": 2664,
    "send_time": "2026-02-17T04:30:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 2664
    },
    "settings": {
      "subject_line": "Upgrade Your Fleet's Emergency Response with ACR Emergency Equipment",
      "preview_text": "Get your fleet’s emergency equipment to work together as a complete safety system.",
      "title": "ShipChandling1",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 888,
      "unique_opens": 728,
      "open_rate": 0.3337077177654806,
      "clicks": 198,
      "subscriber_clicks": 168,
      "click_rate": 0.07460081309756306
    }
  },
  {
    "id": "411b3c182a",
    "web_id": 10124284,
    "type": "regular",
    "create_time": "2026-02-09T14:58:01+00:00",
    "archive_url": "http://eepurl.com/jy3Q26",
    "long_archive_url": "https://mailchi.mp/5933bfaf1843/so-heres-whats-changed-since-we-last-worked-together-10124284",
    "status": "sent",
    "emails_sent": 5254,
    "send_time": "2026-02-11T04:45:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 5254
    },
    "settings": {
      "subject_line": "Reliable Mobile Phones for Tough Environments",
      "preview_text": "Introducing phones designed for hazardous work sites.",
      "title": "Oil and Gas Mobile",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 1716,
      "unique_opens": 1407,
      "open_rate": 0.32674621595764913,
      "clicks": 523,
      "subscriber_clicks": 444,
      "click_rate": 0.09970105470726925
    }
  },
  {
    "id": "d88eaee8da",
    "web_id": 10124289,
    "type": "regular",
    "create_time": "2026-02-10T07:33:41+00:00",
    "archive_url": "http://eepurl.com/jy7RZA",
    "long_archive_url": "https://mailchi.mp/7d912f4e2394/so-heres-whats-changed-since-we-last-worked-together-10124289",
    "status": "sent",
    "emails_sent": 3756,
    "send_time": "2026-02-11T04:30:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 3756
    },
    "settings": {
      "subject_line": "UPDATE: Introducing NSR's MED-DNV Certified Fiber Optic Gyro Compass Series",
      "preview_text": "Navigation technology just evolved - your vessels should too.",
      "title": "Marine Campaign",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 1153,
      "unique_opens": 945,
      "open_rate": 0.3070453418381978,
      "clicks": 292,
      "subscriber_clicks": 248,
      "click_rate": 0.0777994841696695
    }
  },
  {
    "id": "2d86fb9ef8",
    "web_id": 10124270,
    "type": "regular",
    "create_time": "2026-02-06T04:02:50+00:00",
    "archive_url": "http://eepurl.com/jyQEoY",
    "long_archive_url": "https://us4.campaign-archive.com/?u=03ec1fefe04848c1b124754f8&id=2d86fb9ef8",
    "status": "sent",
    "emails_sent": 5857,
    "send_time": "2026-02-06T04:02:58+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 5857
    },
    "settings": {
      "subject_line": "Is Your CO2 Testing Compliant with IMO MSC.581(110)?",
      "preview_text": "Check your compliance with the new 5 Gas detector mandate.",
      "title": "[Re-sent] CO2 Compliance",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 1863,
      "unique_opens": 1527,
      "open_rate": 0.3182040954365311,
      "clicks": 445,
      "subscriber_clicks": 378,
      "click_rate": 0.07601144597952478
    }
  },
  {
    "id": "2771f44e2b",
    "web_id": 10124214,
    "type": "regular",
    "create_time": "2026-01-28T13:02:32+00:00",
    "archive_url": "http://eepurl.com/jx8rhA",
    "long_archive_url": "https://mailchi.mp/a2988c9f3e1b/so-heres-whats-changed-since-we-last-worked-together-10124214",
    "status": "sent",
    "emails_sent": 2823,
    "send_time": "2026-02-05T04:30:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 2823
    },
    "settings": {
      "subject_line": "Is Your CO2 Testing Compliant with IMO MSC.581(110)?",
      "preview_text": "Check your compliance with the new 5 Gas detector mandate.",
      "title": "CO2 Compliance",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 1068,
      "unique_opens": 875,
      "open_rate": 0.3784684983966002,
      "clicks": 131,
      "subscriber_clicks": 111,
      "click_rate": 0.04664656135272989
    }
  },
  {
    "id": "0f6830ae2e",
    "web_id": 10124145,
    "type": "regular",
    "create_time": "2026-01-14T08:40:11+00:00",
    "archive_url": "http://eepurl.com/jwZyk2",
    "long_archive_url": "https://mailchi.mp/4176dda115fb/so-heres-whats-changed-since-we-last-worked-together-10124145",
    "status": "sent",
    "emails_sent": 5939,
    "send_time": "2026-01-20T04:30:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 5939
    },
    "settings": {
      "subject_line": "Important Update: Changes to HSSEQ Procedures for Enclosed Space Entry",
      "preview_text": "Immediate procedure changes and new Riken 5-gas detector requirement.",
      "title": "Compliance",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 1311,
      "unique_opens": 1075,
      "open_rate": 0.22076078220858217,
      "clicks": 524,
      "subscriber_clicks": 445,
      "click_rate": 0.08834193839740864
    }
  },
  {
    "id": "9d086fd1ec",
    "web_id": 10124066,
    "type": "regular",
    "create_time": "2025-12-22T08:37:28+00:00",
    "archive_url": "http://eepurl.com/ju9xUo",
    "long_archive_url": "https://mailchi.mp/5a023be561b0/so-heres-whats-changed-since-we-last-worked-together-10124066",
    "status": "sent",
    "emails_sent": 1801,
    "send_time": "2026-01-08T04:30:00+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 1801
    },
    "settings": {
      "subject_line": "What if your equipment told you it was failing.. before it actually did?",
      "preview_text": "Predict failures weeks before shutdown. Cut unplanned downtime. Protect production targets.",
      "title": "Predictive Maintenenace campaign Oil and Gas",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 566,
      "unique_opens": 464,
      "open_rate": 0.3147295038749954,
      "clicks": 194,
      "subscriber_clicks": 164,
      "click_rate": 0.10778431546611522
    }
  },
  {
    "id": "910d7cea4b",
    "web_id": 10124092,
    "type": "regular",
    "create_time": "2025-12-30T04:55:16+00:00",
    "archive_url": "http://eepurl.com/jvI6ow",
    "long_archive_url": "https://mailchi.mp/394157c34191/this-holiday-season-we-honor-those-who-keep-the-world-moving-10124092",
    "status": "sent",
    "emails_sent": 2306,
    "send_time": "2025-12-31T08:01:34+00:00",
    "content_type": "html",
    "recipients": {
      "list_id": "list_001",
      "list_is_active": true,
      "list_name": "Master Systems Active Clients",
      "segment_text": "All active clients",
      "recipient_count": 2306
    },
    "settings": {
      "subject_line": "This holiday season we honor those who keep the world moving",
      "preview_text": "A note of appreciation from Master Systems.",
      "title": "NewYearFinalEmail",
      "from_name": "Master Systems",
      "reply_to": "hello@discover-mastersystems.com"
    },
    "tracking": {
      "opens": true,
      "html_clicks": true,
      "text_clicks": true
    },
    "report_summary": {
      "opens": 633,
      "unique_opens": 519,
      "open_rate": 0.27479609590586557,
      "clicks": 166,
      "subscriber_clicks": 141,
      "click_rate": 0.07210452367489771
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
