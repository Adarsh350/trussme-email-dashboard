"use client";

import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer, Section } from "@/components/layout/page-container";

import { EmptyState, ErrorState } from "@/components/ui/states";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  Minus,

} from "lucide-react";
import type { CampaignSummary } from "@/lib/analytics/types";
import { compareCampaigns, generateWhatChanged } from "@/lib/analytics/comparisons";
import { formatRate, formatNumber } from "@/lib/utils/format";

export default function ComparePage() {
  const [campaigns, setCampaigns] = useState<CampaignSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedA, setSelectedA] = useState<string>("");
  const [selectedB, setSelectedB] = useState<string>("");

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch("/api/dashboard?period=all");
        if (!res.ok) throw new Error("Failed to load campaigns");
        const json = await res.json();
        setCampaigns(json.campaigns);
        if (json.campaigns.length >= 2) {
          setSelectedA(json.campaigns[0].id);
          setSelectedB(json.campaigns[1].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  const campaignA = campaigns.find((c) => c.id === selectedA);
  const campaignB = campaigns.find((c) => c.id === selectedB);
  const comparisons = campaignA && campaignB ? compareCampaigns(campaignA, campaignB) : [];
  const whatChanged = comparisons.length > 0 ? generateWhatChanged(comparisons) : [];

  return (
    <AppShell>
      <PageContainer
        title="Compare Campaigns"
        subtitle="Side-by-side comparison of two campaigns"
      >
        {error ? (
          <ErrorState error={error} />
        ) : loading ? (
          <CompareSkeleton />
        ) : campaigns.length < 2 ? (
          <EmptyState
            icon={<ArrowLeftRight className="w-7 h-7" />}
            title="Not enough campaigns"
            description="You need at least two campaigns to use comparison mode."
          />
        ) : (
          <>
            {/* Campaign Selectors */}
            <Section>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CampaignSelector
                  label="Campaign A"
                  campaigns={campaigns}
                  value={selectedA}
                  onChange={setSelectedA}
                />
                <CampaignSelector
                  label="Campaign B"
                  campaigns={campaigns}
                  value={selectedB}
                  onChange={setSelectedB}
                />
              </div>
            </Section>

            {/* Comparison Table */}
            {comparisons.length > 0 && (
              <Section title="Metric Comparison" subtitle="Performance differences between the two campaigns">
                <div className="glass-panel overflow-hidden rounded-2xl transition-all duration-300 hover:ring-2 hover:ring-primary-500/20">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-surface-100">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                          Metric
                        </th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                          Campaign A
                        </th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                          Campaign B
                        </th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-50">
                      {comparisons.map((comp) => (
                        <tr key={comp.metric} className="hover:bg-surface-50/50 transition-colors">
                          <td className="px-6 py-3 font-medium text-primary-400">
                            {comp.label}
                          </td>
                          <td className="px-6 py-3 text-right text-surface-700">
                            {formatMetricValue(comp.metric, comp.current)}
                          </td>
                          <td className="px-6 py-3 text-right text-surface-700">
                            {formatMetricValue(comp.metric, comp.previous)}
                          </td>
                          <td className="px-6 py-3 text-right">
                            <div className="inline-flex items-center gap-1">
                              {comp.direction === "up" && (
                                <TrendingUp
                                  className={`w-3.5 h-3.5 ${comp.isPositive ? "text-success-500" : "text-danger-500"}`}
                                />
                              )}
                              {comp.direction === "down" && (
                                <TrendingDown
                                  className={`w-3.5 h-3.5 ${comp.isPositive ? "text-success-500" : "text-danger-500"}`}
                                />
                              )}
                              {comp.direction === "flat" && (
                                <Minus className="w-3.5 h-3.5 text-surface-400" />
                              )}
                              <Badge
                                variant={
                                  comp.direction === "flat"
                                    ? "default"
                                    : comp.isPositive
                                      ? "success"
                                      : "danger"
                                }
                              >
                                {comp.changePercent > 0 ? "+" : ""}
                                {comp.changePercent.toFixed(1)}%
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            {/* What Changed */}
            {whatChanged.length > 0 && (
              <Section title="What Changed" subtitle="Notable differences between these campaigns">
                <div className="glass-panel rounded-2xl p-6 hover:ring-2 hover:ring-primary-500/20 transition-all duration-300">
                  <ul className="space-y-3">
                    {whatChanged.map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-surface-700">
                        <span className="flex-shrink-0 mt-0.5">{change.substring(0, 2)}</span>
                        <span>{change.substring(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            )}
          </>
        )}
      </PageContainer>
    </AppShell>
  );
}

function CampaignSelector({
  label,
  campaigns,
  value,
  onChange,
}: {
  label: string;
  campaigns: CampaignSummary[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:ring-2 hover:ring-primary-500/20 transition-all duration-300">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-primary-500/20 transition-colors duration-500" />
      <label className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
      >
        {campaigns.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title} — {formatRate(c.rates.openRate)} open rate
          </option>
        ))}
      </select>
    </div>
  );
}

function formatMetricValue(metric: string, value: number): string {
  const rateMetrics = ["deliveryRate", "openRate", "clickRate", "ctor", "unsubRate", "bounceRate"];
  if (rateMetrics.includes(metric)) return formatRate(value);
  return formatNumber(value);
}

function CompareSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-20 skeleton-shimmer rounded-2xl" />
        <div className="h-20 skeleton-shimmer rounded-2xl" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 skeleton-shimmer rounded-lg" />
        ))}
      </div>
    </div>
  );
}
