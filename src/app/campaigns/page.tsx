"use client";

import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer } from "@/components/layout/page-container";
import { CampaignTable, CampaignTableSkeleton } from "@/components/campaigns/campaign-table";
import { DateFilter, useDateFilter } from "@/components/dashboard/date-filter";
import { ErrorState } from "@/components/ui/states";
import { RefreshCw } from "lucide-react";
import type { CampaignSummary } from "@/lib/analytics/types";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selected, setSelected } = useDateFilter("all");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/dashboard?period=${selected}`);
      if (!res.ok) throw new Error("Failed to load campaigns");
      const json = await res.json();
      setCampaigns(json.campaigns);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <AppShell>
      <PageContainer
        title="Campaign Explorer"
        subtitle="Browse and analyze all your email campaigns"
        actions={
          <div className="flex items-center gap-3">
            <DateFilter selected={selected} onChange={setSelected} />
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-surface-600 bg-surface-100 border border-surface-200 rounded-xl hover:bg-surface-50 disabled:opacity-50 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        }
      >
        {error ? (
          <ErrorState error={error} onRetry={fetchData} />
        ) : loading ? (
          <CampaignTableSkeleton />
        ) : (
          <CampaignTable campaigns={campaigns} pageSize={15} />
        )}
      </PageContainer>
    </AppShell>
  );
}
