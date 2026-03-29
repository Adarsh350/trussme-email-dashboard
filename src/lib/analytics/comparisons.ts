import type { CampaignSummary, ComparisonResult, DashboardMetrics } from "./types";
import { percentChange } from "@/lib/utils/format";

/**
 * Compare two campaigns side-by-side
 */
export function compareCampaigns(
  campaignA: CampaignSummary,
  campaignB: CampaignSummary
): ComparisonResult[] {
  const metrics: Array<{
    key: string;
    label: string;
    getA: number;
    getB: number;
    higherIsBetter: boolean;
  }> = [
    { key: "sent", label: "Emails Sent", getA: campaignA.emails.sent, getB: campaignB.emails.sent, higherIsBetter: true },
    { key: "delivered", label: "Delivered", getA: campaignA.emails.delivered, getB: campaignB.emails.delivered, higherIsBetter: true },
    { key: "deliveryRate", label: "Delivery Rate", getA: campaignA.rates.deliveryRate, getB: campaignB.rates.deliveryRate, higherIsBetter: true },
    { key: "openRate", label: "Open Rate", getA: campaignA.rates.openRate, getB: campaignB.rates.openRate, higherIsBetter: true },
    { key: "clickRate", label: "Click Rate", getA: campaignA.rates.clickRate, getB: campaignB.rates.clickRate, higherIsBetter: true },
    { key: "ctor", label: "Click-to-Open", getA: campaignA.rates.clickToOpenRate, getB: campaignB.rates.clickToOpenRate, higherIsBetter: true },
    { key: "unsubRate", label: "Unsub Rate", getA: campaignA.rates.unsubscribeRate, getB: campaignB.rates.unsubscribeRate, higherIsBetter: false },
    { key: "bounceRate", label: "Bounce Rate", getA: campaignA.rates.bounceRate, getB: campaignB.rates.bounceRate, higherIsBetter: false },
  ];

  return metrics.map(({ key, label, getA, getB, higherIsBetter }) => {
    const change = getA - getB;
    const changePct = percentChange(getA, getB);
    const direction: "up" | "down" | "flat" =
      Math.abs(changePct) < 0.5 ? "flat" : changePct > 0 ? "up" : "down";
    const isPositive = higherIsBetter ? direction === "up" : direction === "down";

    return {
      metric: key,
      label,
      current: getA,
      previous: getB,
      change,
      changePercent: changePct,
      direction,
      isPositive,
    };
  });
}

/**
 * Compare two periods of dashboard metrics
 */
export function comparePeriods(
  current: DashboardMetrics,
  previous: DashboardMetrics
): ComparisonResult[] {
  const metrics: Array<{
    key: string;
    label: string;
    getCurrent: number;
    getPrevious: number;
    higherIsBetter: boolean;
  }> = [
    { key: "campaigns", label: "Campaigns", getCurrent: current.totalCampaigns, getPrevious: previous.totalCampaigns, higherIsBetter: true },
    { key: "sent", label: "Total Sent", getCurrent: current.totalSent, getPrevious: previous.totalSent, higherIsBetter: true },
    { key: "openRate", label: "Avg Open Rate", getCurrent: current.avgOpenRate, getPrevious: previous.avgOpenRate, higherIsBetter: true },
    { key: "clickRate", label: "Avg Click Rate", getCurrent: current.avgClickRate, getPrevious: previous.avgClickRate, higherIsBetter: true },
    { key: "unsubRate", label: "Avg Unsub Rate", getCurrent: current.avgUnsubscribeRate, getPrevious: previous.avgUnsubscribeRate, higherIsBetter: false },
    { key: "bounceRate", label: "Avg Bounce Rate", getCurrent: current.avgBounceRate, getPrevious: previous.avgBounceRate, higherIsBetter: false },
  ];

  return metrics.map(({ key, label, getCurrent, getPrevious, higherIsBetter }) => {
    const change = getCurrent - getPrevious;
    const changePct = percentChange(getCurrent, getPrevious);
    const direction: "up" | "down" | "flat" =
      Math.abs(changePct) < 0.5 ? "flat" : changePct > 0 ? "up" : "down";
    const isPositive = higherIsBetter ? direction === "up" : direction === "down";

    return {
      metric: key,
      label,
      current: getCurrent,
      previous: getPrevious,
      change,
      changePercent: changePct,
      direction,
      isPositive,
    };
  });
}

/**
 * Generate "what changed" narrative from comparison results
 */
export function generateWhatChanged(comparisons: ComparisonResult[]): string[] {
  const changes: string[] = [];

  for (const comp of comparisons) {
    if (comp.direction === "flat") continue;

    const verb = comp.direction === "up" ? "increased" : "decreased";
    const absChange = Math.abs(comp.changePercent);

    if (absChange > 10) {
      const sentiment = comp.isPositive ? "📈" : "📉";
      changes.push(
        `${sentiment} ${comp.label} ${verb} by ${absChange.toFixed(1)}% (${comp.previous.toFixed(1)} → ${comp.current.toFixed(1)})`
      );
    }
  }

  if (changes.length === 0) {
    changes.push("No significant changes detected between the two periods.");
  }

  return changes;
}
