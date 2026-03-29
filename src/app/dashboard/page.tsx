"use client";

import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer, Section } from "@/components/layout/page-container";
import { StatCard, StatCardSkeleton } from "@/components/ui/stat-card";
import { TrendCharts, ChartSkeleton } from "@/components/dashboard/trend-charts";
import { InsightCards } from "@/components/dashboard/insight-cards";
import { CampaignTable, CampaignTableSkeleton } from "@/components/campaigns/campaign-table";
import { DateFilter, useDateFilter } from "@/components/dashboard/date-filter";
import { EmptyState, ErrorState } from "@/components/ui/states";
import {
  Mail,
  Send,
  Eye,
  MousePointerClick,
  UserMinus,
  AlertTriangle,
  CheckCircle,
  Target,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import type { CampaignSummary, DashboardMetrics, Insight } from "@/lib/analytics/types";
import { formatNumber, formatRate } from "@/lib/utils/format";

interface DashboardData {
  campaigns: CampaignSummary[];
  metrics: DashboardMetrics;
  insights: Insight[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selected, setSelected } = useDateFilter("90d");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/dashboard?period=${selected}`);
      if (!res.ok) throw new Error("Failed to load dashboard data");
      const json = await res.json();
      setData(json);
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
        title="Campaign Overview"
        subtitle="Performance insights across your email campaigns"
        actions={
          <div className="flex items-center gap-3">
            <DateFilter selected={selected} onChange={setSelected} />
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-surface-600 bg-surface-100 border border-surface-200 rounded-xl hover:bg-surface-50 disabled:opacity-50 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        }
      >
        {error ? (
          <ErrorState error={error} onRetry={fetchData} />
        ) : loading ? (
          <DashboardSkeleton />
        ) : !data || data.campaigns.length === 0 ? (
          <EmptyState
            icon={<BarChart3 className="w-7 h-7" />}
            title="No campaign data available"
            description="Connect your Mailchimp account and send campaigns to see analytics here."
          />
        ) : (
          <>
            {/* KPI Strip - Unified Glass Module */}
            <Section>
              <div className="bg-surface-50/60 backdrop-blur-2xl border border-surface-200/80 rounded-3xl p-2 shadow-glass relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 relative z-10">
                  <div className="p-4 sm:p-5">
                    <StatCard
                      label="Campaigns"
                      value={data.metrics.totalCampaigns}
                      icon={<Mail className="w-5 h-5 text-primary-500" />}
                    />
                  </div>
                  <div className="p-4 sm:p-5 relative before:absolute before:inset-y-4 before:left-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-surface-200 before:to-transparent hidden sm:block">
                    <StatCard
                      label="Emails Sent"
                      value={formatNumber(data.metrics.totalSent)}
                      icon={<Send className="w-5 h-5 text-indigo-500" />}
                    />
                  </div>
                  <div className="p-4 sm:p-5 relative before:absolute before:inset-y-4 before:left-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-surface-200 before:to-transparent hidden sm:block">
                    <StatCard
                      label="Avg Open Rate"
                      value={formatRate(data.metrics.avgOpenRate)}
                      icon={<Eye className="w-5 h-5" />}
                      color={data.metrics.avgOpenRate >= 30 ? "success" : data.metrics.avgOpenRate >= 20 ? "warning" : "danger"}
                    />
                  </div>
                  <div className="p-4 sm:p-5 relative before:absolute before:inset-y-4 before:left-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-surface-200 before:to-transparent hidden lg:block">
                    <StatCard
                      label="Avg Click Rate"
                      value={formatRate(data.metrics.avgClickRate)}
                      icon={<MousePointerClick className="w-5 h-5" />}
                      color={data.metrics.avgClickRate >= 10 ? "success" : data.metrics.avgClickRate >= 5 ? "warning" : "danger"}
                    />
                  </div>
                  <div className="p-4 sm:p-5 relative before:absolute before:inset-y-4 before:left-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-surface-200 before:to-transparent hidden lg:block">
                    <StatCard
                      label="Delivery Rate"
                      value={formatRate(data.metrics.avgDeliveryRate)}
                      icon={<CheckCircle className="w-5 h-5" />}
                      color={data.metrics.avgDeliveryRate >= 95 ? "success" : data.metrics.avgDeliveryRate >= 90 ? "warning" : "danger"}
                    />
                  </div>
                </div>
              </div>
            </Section>

            {/* Secondary metrics */}
            <Section>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <StatCard
                  label="Click-to-Open"
                  value={formatRate(data.metrics.avgClickToOpenRate)}
                  icon={<Target className="w-5 h-5" />}
                  color={data.metrics.avgClickToOpenRate >= 15 ? "success" : data.metrics.avgClickToOpenRate >= 10 ? "warning" : "danger"}
                />
                <StatCard
                  label="Unsub Rate"
                  value={formatRate(data.metrics.avgUnsubscribeRate, 2)}
                  icon={<UserMinus className="w-5 h-5" />}
                  color={data.metrics.avgUnsubscribeRate <= 0.2 ? "success" : data.metrics.avgUnsubscribeRate <= 0.5 ? "warning" : "danger"}
                />
                <StatCard
                  label="Bounce Rate"
                  value={formatRate(data.metrics.avgBounceRate, 2)}
                  icon={<AlertTriangle className="w-5 h-5" />}
                  color={data.metrics.avgBounceRate <= 2 ? "success" : data.metrics.avgBounceRate <= 5 ? "warning" : "danger"}
                />
                <StatCard
                  label="Total Opens"
                  value={formatNumber(data.metrics.totalOpens)}
                  icon={<Eye className="w-5 h-5" />}
                />
              </div>
            </Section>

            {/* Trend Charts */}
            <Section title="Trends" subtitle="Campaign performance over time">
              <TrendCharts data={data.metrics.trends} />
            </Section>

            {/* Insights */}
            {data.insights.length > 0 && (
              <Section title="Insights" subtitle="Key observations from your campaign data">
                <InsightCards insights={data.insights} />
              </Section>
            )}

            {/* Campaign Table */}
            <Section title="Recent Campaigns" subtitle="Click any campaign to see detailed analytics">
              <CampaignTable campaigns={data.campaigns} />
            </Section>
          </>
        )}
      </PageContainer>
    </AppShell>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <CampaignTableSkeleton />
    </div>
  );
}
