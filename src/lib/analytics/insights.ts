import type { CampaignSummary, Insight, DashboardMetrics } from "./types";

/**
 * Deterministic insight engine
 * Generates plain-English, client-safe observations from campaign data
 */
export function generateInsights(
  campaigns: CampaignSummary[],
  metrics: DashboardMetrics
): Insight[] {
  const insights: Insight[] = [];

  if (campaigns.length === 0) return insights;

  // Best campaign by open rate
  const bestOpenRate = [...campaigns].sort(
    (a, b) => b.rates.openRate - a.rates.openRate
  )[0];
  if (bestOpenRate) {
    insights.push({
      id: "best-open-rate",
      type: "success",
      title: "Highest Open Rate",
      description: `"${bestOpenRate.subjectLine}" achieved a ${bestOpenRate.rates.openRate.toFixed(1)}% open rate — the strongest in this period.`,
      metric: "Open Rate",
      value: `${bestOpenRate.rates.openRate.toFixed(1)}%`,
      campaignId: bestOpenRate.id,
      campaignTitle: bestOpenRate.title,
    });
  }

  // Best campaign by click rate
  const bestClickRate = [...campaigns].sort(
    (a, b) => b.rates.clickRate - a.rates.clickRate
  )[0];
  if (bestClickRate && bestClickRate.id !== bestOpenRate?.id) {
    insights.push({
      id: "best-click-rate",
      type: "success",
      title: "Top Click Performance",
      description: `"${bestClickRate.subjectLine}" drove a ${bestClickRate.rates.clickRate.toFixed(1)}% click rate, leading engagement for the period.`,
      metric: "Click Rate",
      value: `${bestClickRate.rates.clickRate.toFixed(1)}%`,
      campaignId: bestClickRate.id,
      campaignTitle: bestClickRate.title,
    });
  }

  // Highest unsubscribe campaign
  const worstUnsub = [...campaigns].sort(
    (a, b) => b.rates.unsubscribeRate - a.rates.unsubscribeRate
  )[0];
  if (worstUnsub && worstUnsub.rates.unsubscribeRate > 0.5) {
    insights.push({
      id: "unsub-spike",
      type: "warning",
      title: "Unsubscribe Spike",
      description: `"${worstUnsub.subjectLine}" had a ${worstUnsub.rates.unsubscribeRate.toFixed(2)}% unsubscribe rate — higher than typical. Consider reviewing the content or audience targeting.`,
      metric: "Unsub Rate",
      value: `${worstUnsub.rates.unsubscribeRate.toFixed(2)}%`,
      campaignId: worstUnsub.id,
      campaignTitle: worstUnsub.title,
    });
  }

  // Weakest campaign by open rate
  const worstOpenRate = [...campaigns].sort(
    (a, b) => a.rates.openRate - b.rates.openRate
  )[0];
  if (
    worstOpenRate &&
    worstOpenRate.id !== bestOpenRate?.id &&
    worstOpenRate.rates.openRate < metrics.avgOpenRate * 0.8
  ) {
    insights.push({
      id: "weak-open-rate",
      type: "danger",
      title: "Below-Average Opens",
      description: `"${worstOpenRate.subjectLine}" opened at ${worstOpenRate.rates.openRate.toFixed(1)}%, which is ${((1 - worstOpenRate.rates.openRate / metrics.avgOpenRate) * 100).toFixed(0)}% below the period average. The subject line or send timing may need revisiting.`,
      metric: "Open Rate",
      value: `${worstOpenRate.rates.openRate.toFixed(1)}%`,
      campaignId: worstOpenRate.id,
      campaignTitle: worstOpenRate.title,
    });
  }

  // Deliverability health
  if (metrics.avgBounceRate > 3) {
    insights.push({
      id: "deliverability-warning",
      type: "danger",
      title: "Deliverability Warning",
      description: `Average bounce rate is ${metrics.avgBounceRate.toFixed(1)}%, which exceeds the 3% threshold. This may indicate list hygiene issues or domain reputation concerns.`,
      metric: "Bounce Rate",
      value: `${metrics.avgBounceRate.toFixed(1)}%`,
    });
  } else if (metrics.avgBounceRate < 1.5) {
    insights.push({
      id: "deliverability-healthy",
      type: "success",
      title: "Strong Deliverability",
      description: `Bounce rate is holding at ${metrics.avgBounceRate.toFixed(1)}% — well within healthy range. List hygiene looks good.`,
      metric: "Bounce Rate",
      value: `${metrics.avgBounceRate.toFixed(1)}%`,
    });
  }

  // Volume trend
  if (campaigns.length >= 3) {
    const sorted = [...campaigns].sort(
      (a, b) => new Date(a.sendTime).getTime() - new Date(b.sendTime).getTime()
    );
    const firstHalf = sorted.slice(0, Math.floor(sorted.length / 2));
    const secondHalf = sorted.slice(Math.floor(sorted.length / 2));

    const firstAvgOpens = firstHalf.reduce((s, c) => s + c.rates.openRate, 0) / firstHalf.length;
    const secondAvgOpens = secondHalf.reduce((s, c) => s + c.rates.openRate, 0) / secondHalf.length;

    const change = secondAvgOpens - firstAvgOpens;
    if (Math.abs(change) > 2) {
      insights.push({
        id: "open-trend",
        type: change > 0 ? "success" : "warning",
        title: change > 0 ? "Improving Open Rates" : "Declining Open Rates",
        description: change > 0
          ? `Open rates improved by ${change.toFixed(1)} points in the latter half of this period, suggesting stronger subject lines or better send timing.`
          : `Open rates declined by ${Math.abs(change).toFixed(1)} points in the latter half of this period. Consider experimenting with subject lines or audience segments.`,
        change,
      });
    }
  }

  // Best click-to-open ratio (engagement quality)
  const bestCTOR = [...campaigns]
    .filter((c) => c.opens.unique > 0)
    .sort((a, b) => b.rates.clickToOpenRate - a.rates.clickToOpenRate)[0];
  if (bestCTOR && bestCTOR.rates.clickToOpenRate > 25) {
    insights.push({
      id: "best-ctor",
      type: "info",
      title: "Best Content Engagement",
      description: `"${bestCTOR.subjectLine}" converted ${bestCTOR.rates.clickToOpenRate.toFixed(1)}% of openers into clickers — a sign of highly relevant content.`,
      metric: "Click-to-Open",
      value: `${bestCTOR.rates.clickToOpenRate.toFixed(1)}%`,
      campaignId: bestCTOR.id,
      campaignTitle: bestCTOR.title,
    });
  }

  // Most volume campaign
  const highestVolume = [...campaigns].sort(
    (a, b) => b.emails.sent - a.emails.sent
  )[0];
  if (highestVolume) {
    insights.push({
      id: "highest-volume",
      type: "info",
      title: "Largest Campaign",
      description: `"${highestVolume.subjectLine}" reached ${highestVolume.emails.sent.toLocaleString()} recipients — the biggest send volume this period.`,
      metric: "Emails Sent",
      value: highestVolume.emails.sent.toLocaleString(),
      campaignId: highestVolume.id,
      campaignTitle: highestVolume.title,
    });
  }

  return insights;
}

/**
 * Generate campaign-level narrative for the detail page
 */
export function generateCampaignNarrative(
  campaign: CampaignSummary,
  avgOpenRate: number,
  avgClickRate: number
): string {
  const parts: string[] = [];

  // Opening summary
  parts.push(
    `This campaign was sent to ${campaign.emails.sent.toLocaleString()} recipients and achieved a ${campaign.rates.deliveryRate.toFixed(1)}% delivery rate.`
  );

  // Open analysis
  const openDiff = campaign.rates.openRate - avgOpenRate;
  if (Math.abs(openDiff) > 2) {
    if (openDiff > 0) {
      parts.push(
        `The ${campaign.rates.openRate.toFixed(1)}% open rate is ${openDiff.toFixed(1)} points above your account average, suggesting the subject line resonated well with this audience.`
      );
    } else {
      parts.push(
        `The ${campaign.rates.openRate.toFixed(1)}% open rate fell ${Math.abs(openDiff).toFixed(1)} points below your account average. The subject line or send timing may need adjustment for this segment.`
      );
    }
  } else {
    parts.push(
      `The ${campaign.rates.openRate.toFixed(1)}% open rate is in line with your account average.`
    );
  }

  // Click analysis
  const clickDiff = campaign.rates.clickRate - avgClickRate;
  if (campaign.rates.clickRate > 15) {
    parts.push(
      `Click engagement was strong at ${campaign.rates.clickRate.toFixed(1)}%, indicating the content and calls to action were compelling.`
    );
  } else if (clickDiff < -3) {
    parts.push(
      `Click-through at ${campaign.rates.clickRate.toFixed(1)}% was below average. Consider testing different CTA placement, button design, or content structure.`
    );
  }

  // Unsubscribe analysis
  if (campaign.rates.unsubscribeRate > 0.5) {
    parts.push(
      `The ${campaign.rates.unsubscribeRate.toFixed(2)}% unsubscribe rate is elevated. Review whether the content aligned with subscriber expectations.`
    );
  }

  // CTOR analysis
  if (campaign.rates.clickToOpenRate > 30) {
    parts.push(
      `The ${campaign.rates.clickToOpenRate.toFixed(1)}% click-to-open rate shows that once subscribers opened, the content effectively drove action.`
    );
  }

  return parts.join(" ");
}
