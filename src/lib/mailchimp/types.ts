// ============================================
// Raw Mailchimp API response types
// ============================================

export interface MailchimpCampaign {
  id: string;
  web_id: number;
  type: string;
  create_time: string;
  archive_url: string;
  long_archive_url: string;
  status: string;
  emails_sent: number;
  send_time: string;
  content_type: string;
  recipients: {
    list_id: string;
    list_is_active: boolean;
    list_name: string;
    segment_text: string;
    recipient_count: number;
  };
  settings: {
    subject_line: string;
    preview_text: string;
    title: string;
    from_name: string;
    reply_to: string;
  };
  tracking: {
    opens: boolean;
    html_clicks: boolean;
    text_clicks: boolean;
  };
  report_summary?: {
    opens: number;
    unique_opens: number;
    open_rate: number;
    clicks: number;
    subscriber_clicks: number;
    click_rate: number;
    ecommerce?: {
      total_orders: number;
      total_spent: number;
      total_revenue: number;
    };
  };
}

export interface MailchimpCampaignReport {
  id: string;
  campaign_title: string;
  type: string;
  list_id: string;
  list_is_active: boolean;
  list_name: string;
  subject_line: string;
  preview_text: string;
  emails_sent: number;
  abuse_reports: number;
  unsubscribed: number;
  send_time: string;
  forwards: {
    forwards_count: number;
    forwards_opens: number;
  };
  opens: {
    opens_total: number;
    unique_opens: number;
    open_rate: number;
    last_open: string;
  };
  clicks: {
    clicks_total: number;
    unique_clicks: number;
    unique_subscriber_clicks: number;
    click_rate: number;
    last_click: string;
  };
  bounces: {
    hard_bounces: number;
    soft_bounces: number;
    syntax_errors: number;
  };
  list_stats: {
    sub_rate: number;
    unsub_rate: number;
    open_rate: number;
    click_rate: number;
  };
  timeseries: Array<{
    timestamp: string;
    emails_sent: number;
    unique_opens: number;
    recipients_clicks: number;
  }>;
}

export interface MailchimpClickDetail {
  urls_clicked: Array<{
    id: string;
    url: string;
    total_clicks: number;
    click_percentage: number;
    unique_clicks: number;
    unique_click_percentage: number;
    last_click: string;
    campaign_id: string;
  }>;
  campaign_id: string;
  total_items: number;
}

export interface MailchimpDomainPerformance {
  domains: Array<{
    domain: string;
    emails_sent: number;
    bounces: number;
    opens: number;
    clicks: number;
    unsubs: number;
    delivered: number;
    emails_pct: number;
    bounces_pct: number;
    opens_pct: number;
    clicks_pct: number;
    unsubs_pct: number;
  }>;
  campaign_id: string;
  total_sent: number;
  total_items: number;
}

export interface MailchimpUnsubscribeReport {
  unsubscribes: Array<{
    email_id: string;
    email_address: string;
    merge_fields: Record<string, string>;
    timestamp: string;
    reason: string;
    campaign_id: string;
    list_id: string;
    list_is_active: boolean;
  }>;
  campaign_id: string;
  total_items: number;
}

export interface MailchimpListResponse<T> {
  total_items: number;
  campaigns?: T[];
  reports?: T[];
}

export interface MailchimpApiError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}
