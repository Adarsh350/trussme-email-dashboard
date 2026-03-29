import { NextResponse } from "next/server";
import { getCampaignReport, getCampaignClickDetails, getCampaignDomainPerformance, getCampaignUnsubscribes } from "@/lib/mailchimp/endpoints";
import { normalizeFullDetail } from "@/lib/analytics/normalize";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [report, clickDetails, domainPerf, unsubs] = await Promise.all([
      getCampaignReport(id),
      getCampaignClickDetails(id),
      getCampaignDomainPerformance(id),
      getCampaignUnsubscribes(id),
    ]);

    const detail = normalizeFullDetail(report, clickDetails, domainPerf, unsubs);

    return NextResponse.json(detail);
  } catch (error) {
    console.error("Campaign detail API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaign details" },
      { status: 500 }
    );
  }
}
