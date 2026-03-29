import { NextResponse } from "next/server";
import { getCampaigns, getAllCampaignReports } from "@/lib/mailchimp/endpoints";
import { normalizeCampaign, normalizeReport, aggregateDashboardMetrics } from "@/lib/analytics/normalize";
import { generateInsights } from "@/lib/analytics/insights";
import { isMailchimpConfigured } from "@/lib/env";
import type { CampaignSummary } from "@/lib/analytics/types";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5-minute cache

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") ?? "90d";

    // Calculate date range
    const now = new Date();
    let sinceSendTime: string | undefined;

    const daysMap: Record<string, number> = {
      "7d": 7,
      "14d": 14,
      "30d": 30,
      "60d": 60,
      "90d": 90,
      "6m": 180,
      "1y": 365,
    };

    if (period !== "all" && daysMap[period]) {
      const since = new Date(now.getTime() - daysMap[period] * 86400000);
      sinceSendTime = since.toISOString();
    }

    let campaigns: CampaignSummary[];

    if (isMailchimpConfigured()) {
      // Use reports endpoint for richer data
      const reports = await getAllCampaignReports(sinceSendTime);
      campaigns = reports.map(normalizeReport);
    } else {
      // Use mock campaigns
      const { campaigns: rawCampaigns } = await getCampaigns({ sinceSendTime });
      campaigns = rawCampaigns.map(normalizeCampaign);

      // Filter by date range for mock data
      if (sinceSendTime) {
        const sinceDate = new Date(sinceSendTime);
        campaigns = campaigns.filter((c) => new Date(c.sendTime) >= sinceDate);
      }
    }

    // Sort by send time descending
    campaigns.sort((a, b) => new Date(b.sendTime).getTime() - new Date(a.sendTime).getTime());

    const metrics = aggregateDashboardMetrics(campaigns);
    const insights = generateInsights(campaigns, metrics);

    return NextResponse.json({ campaigns, metrics, insights });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
