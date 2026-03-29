// ============================================
// Normalized internal analytics types
// These are the shapes used by all UI components
// ============================================

export interface CampaignSummary {
  id: string;
  title: string;
  subjectLine: string;
  sendTime: string;
  status: "sent" | "sending" | "draft" | "paused" | "schedule" | "canceled";
  listName: string;
  listId: string;
  emails: {
    sent: number;
    delivered: number;
    bounced: number;
    hardBounced: number;
    softBounced: number;
  };
  rates: {
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    clickToOpenRate: number;
    unsubscribeRate: number;
    bounceRate: number;
  };
  opens: {
    total: number;
    unique: number;
  };
  clicks: {
    total: number;
    unique: number;
  };
  unsubscribes: number;
  forwardCount: number;
  abuseReports: number;
}

export interface CampaignDetail extends CampaignSummary {
  previewText: string;
  topLinks: LinkPerformance[];
  domainPerformance: DomainStats[];
  unsubscribeDetails: UnsubscribeDetail[];
  timeSeries: TimeSeriesPoint[];
}

export interface LinkPerformance {
  url: string;
  totalClicks: number;
  uniqueClicks: number;
  clickPercentage: number;
  lastClickTime: string;
}

export interface DomainStats {
  domain: string;
  emailsSent: number;
  bounces: number;
  opens: number;
  clicks: number;
  unsubscribes: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
}

export interface UnsubscribeDetail {
  emailAddress: string;
  timestamp: string;
  reason: string;
  campaignId: string;
}

export interface TimeSeriesPoint {
  date: string;
  opens: number;
  clicks: number;
  delivered: number;
  unsubscribes: number;
  bounces: number;
}

export interface DashboardMetrics {
  totalCampaigns: number;
  totalSent: number;
  totalDelivered: number;
  totalOpens: number;
  totalClicks: number;
  totalUnsubscribes: number;
  totalBounces: number;
  avgDeliveryRate: number;
  avgOpenRate: number;
  avgClickRate: number;
  avgClickToOpenRate: number;
  avgUnsubscribeRate: number;
  avgBounceRate: number;
  dateRange: {
    start: string;
    end: string;
  };
  trends: TimeSeriesPoint[];
}

export interface Insight {
  id: string;
  type: "success" | "warning" | "info" | "danger";
  title: string;
  description: string;
  metric?: string;
  value?: string;
  change?: number;
  campaignId?: string;
  campaignTitle?: string;
}

export interface ComparisonResult {
  metric: string;
  label: string;
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  direction: "up" | "down" | "flat";
  isPositive: boolean;
}

export interface DateRange {
  start: Date;
  end: Date;
  label: string;
}
