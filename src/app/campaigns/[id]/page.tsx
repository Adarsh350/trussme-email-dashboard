"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer, Section } from "@/components/layout/page-container";
import { StatCard, StatCardSkeleton } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { ErrorState } from "@/components/ui/states";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  ArrowLeft,
  Send,
  Eye,
  MousePointerClick,
  UserMinus,
  AlertTriangle,
  Target,
  Calendar,
  Users,
  ExternalLink,
  CheckCircle,
  XCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import type { CampaignDetail } from "@/lib/analytics/types";
import { formatNumber, formatRate, formatDate, formatCompact } from "@/lib/utils/format";
import { generateCampaignNarrative } from "@/lib/analytics/insights";

// Account average mock defaults (would be computed from all campaign data in production)
const ACC_AVG_OPEN_RATE = 32.5;
const ACC_AVG_CLICK_RATE = 14.2;

export default function CampaignDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [detail, setDetail] = useState<CampaignDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const res = await fetch(`/api/campaigns/${id}`);
        if (!res.ok) throw new Error("Failed to load campaign details");
        const json = await res.json();
        setDetail(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) return <CampaignDetailSkeleton />;
  if (error) {
    return (
      <AppShell>
        <PageContainer title="Campaign Detail">
          <ErrorState error={error} />
        </PageContainer>
      </AppShell>
    );
  }
  if (!detail) return null;

  const narrative = generateCampaignNarrative(detail, ACC_AVG_OPEN_RATE, ACC_AVG_CLICK_RATE);

  return (
    <AppShell>
      <PageContainer
        title={detail.title}
        subtitle={detail.subjectLine}
        actions={
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-surface-600 bg-surface-100 border border-surface-200 rounded-xl hover:bg-surface-50 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Campaigns
          </Link>
        }
      >
        {/* Hero Summary */}
        <Section>
          <div className="relative bg-surface-100 rounded-2xl p-6 sm:p-8 text-white overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5">
            {/* Ambient glows */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-surface-50 to-accent-600/10 pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-500/15 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent-500/15 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none hidden" />

            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 drop-shadow-lg">{detail.title}</h2>
                  <p className="text-white/80 font-medium text-lg leading-relaxed max-w-2xl">{detail.subjectLine}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 bg-surface-100/50 rounded-2xl p-5 border border-white/[0.03]">
                <HeroStat icon={<Calendar className="w-4 h-4" />} label="Sent" value={formatDate(detail.sendTime, "MMM d, yyyy h:mm a")} />
                <HeroStat icon={<Users className="w-4 h-4" />} label="Audience" value={detail.listName} />
                <HeroStat icon={<Send className="w-4 h-4" />} label="Recipients" value={formatNumber(detail.emails.sent)} />
                <HeroStat icon={<CheckCircle className="w-4 h-4" />} label="Delivered" value={formatNumber(detail.emails.delivered)} />
              </div>
            </div>
          </div>
        </Section>

        {/* Metric Cards */}
        <Section>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <StatCard 
              label="Open Rate" 
              value={formatRate(detail.rates.openRate)} 
              icon={<Eye className="w-5 h-5" />} 
              color={detail.rates.openRate >= 30 ? "success" : detail.rates.openRate >= 20 ? "warning" : "danger"} 
            />
            <StatCard 
              label="Click Rate" 
              value={formatRate(detail.rates.clickRate)} 
              icon={<MousePointerClick className="w-5 h-5" />} 
              color={detail.rates.clickRate >= 10 ? "success" : detail.rates.clickRate >= 5 ? "warning" : "danger"} 
            />
            <StatCard 
              label="Click-to-Open" 
              value={formatRate(detail.rates.clickToOpenRate)} 
              icon={<Target className="w-5 h-5" />} 
              color={detail.rates.clickToOpenRate >= 15 ? "success" : detail.rates.clickToOpenRate >= 10 ? "warning" : "danger"} 
            />
            <StatCard 
              label="Delivery Rate" 
              value={formatRate(detail.rates.deliveryRate)} 
              icon={<CheckCircle className="w-5 h-5" />} 
              color={detail.rates.deliveryRate >= 95 ? "success" : detail.rates.deliveryRate >= 90 ? "warning" : "danger"} 
            />
            <StatCard 
              label="Unsub Rate" 
              value={formatRate(detail.rates.unsubscribeRate, 2)} 
              icon={<UserMinus className="w-5 h-5" />} 
              color={detail.rates.unsubscribeRate <= 0.2 ? "success" : detail.rates.unsubscribeRate <= 0.5 ? "warning" : "danger"} 
            />
            <StatCard 
              label="Bounce Rate" 
              value={formatRate(detail.rates.bounceRate, 2)} 
              icon={<AlertTriangle className="w-5 h-5" />} 
              color={detail.rates.bounceRate <= 2 ? "success" : detail.rates.bounceRate <= 5 ? "warning" : "danger"} 
            />
          </div>
        </Section>

        {/* Engagement Funnel */}
        <Section title="Engagement Funnel" subtitle="Subscriber journey from delivery to click">
          <EngagementFunnel detail={detail} />
        </Section>

        {/* Top Links */}
        {detail.topLinks.length > 0 && (
          <Section title="Top Links" subtitle="Click performance by URL">
            <TopLinksTable links={detail.topLinks} />
          </Section>
        )}

        {/* Time Performance */}
        {detail.timeSeries && detail.timeSeries.length > 0 && (
          <Section title="24-Hour Performance" subtitle="Opens and clicks following delivery">
            <CampaignTimelineChart data={detail.timeSeries} />
          </Section>
        )}

        {/* Deliverability Health */}
        <Section title="Deliverability Health" subtitle="Bounce and complaint metrics">
          <DeliverabilityHealth detail={detail} />
        </Section>

        {/* Narrative Summary */}
        <Section title="Campaign Analysis" subtitle="Automated performance assessment">
          <div className="bg-surface-100 rounded-2xl premium-card p-6 sm:p-8 group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 text-primary-600 shadow-sm border border-primary-100 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-[15px] font-medium text-surface-700 leading-relaxed pt-1">{narrative}</p>
            </div>
          </div>
        </Section>
      </PageContainer>
    </AppShell>
  );
}

function HeroStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5 opacity-80">
        <span className="text-primary-300">{icon}</span>
        <span className="text-[11px] font-bold tracking-widest uppercase text-primary-200">{label}</span>
      </div>
      <p className="text-[15px] font-bold text-white tracking-tight">{value}</p>
    </div>
  );
}

function EngagementFunnel({ detail }: { detail: CampaignDetail }) {
  const steps = [
    { label: "Sent", value: detail.emails.sent, color: "#3b82f6" },
    { label: "Delivered", value: detail.emails.delivered, color: "#6366f1" },
    { label: "Opened", value: detail.opens.unique, color: "#8b5cf6" },
    { label: "Clicked", value: detail.clicks.unique, color: "#10b981" },
  ];

  const maxVal = steps[0].value || 1;

  return (
    <div className="bg-surface-50/50 rounded-3xl premium-card p-6 sm:p-8 border border-surface-200/50 ring-1 ring-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-100/0 to-surface-100/50 pointer-events-none" />
      <div className="space-y-6 relative z-10">
        {steps.map((step, i) => {
          const pct = (step.value / maxVal) * 100;
          const dropoff =
            i > 0 ? ((steps[i - 1].value - step.value) / steps[i - 1].value) * 100 : 0;
          return (
            <div key={step.label} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex flex-wrap items-end justify-between mb-2.5 gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-extrabold tracking-widest uppercase text-white drop-shadow-md">{step.label}</span>
                  {i > 0 && dropoff > 0 && (
                    <span className="text-[10px] font-bold text-danger-400 bg-danger-500/10 border border-danger-500/20 px-2 py-0.5 rounded-full shadow-sm">
                      −{dropoff.toFixed(1)}%
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-black text-white tracking-tight drop-shadow-md">
                    {formatNumber(step.value)}
                  </span>
                  <span className="text-xs font-bold text-surface-400 w-12 text-right">{pct.toFixed(1)}%</span>
                </div>
              </div>
              <div className="h-4 bg-surface-100 rounded-full overflow-hidden border border-surface-200 shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) relative overflow-hidden"
                  style={{
                    width: `${Math.max(pct, 1)}%`,
                    backgroundColor: step.color,
                    boxShadow: `0 0 20px ${step.color}80`,
                  }}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopLinksTable({ links }: { links: CampaignDetail["topLinks"] }) {
  return (
    <div className="bg-surface-100 rounded-2xl premium-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200/60 bg-surface-50/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                URL
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                Total Clicks
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                Unique Clicks
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                % of Clicks
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100/50">
            {links.slice(0, 10).map((link, i) => (
              <tr key={i} className="hover:bg-primary-50/30 transition-colors group animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5 max-w-[320px]">
                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-surface-100 text-surface-400 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate text-surface-700 font-semibold group-hover:text-primary-700 transition-colors">{link.url}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-bold text-primary-400">
                  {formatNumber(link.totalClicks)}
                </td>
                <td className="px-6 py-4 text-right text-surface-600 font-medium">
                  {formatNumber(link.uniqueClicks)}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold ${
                    i === 0 ? "bg-primary-100 text-primary-700" : "bg-surface-100 text-surface-600"
                  }`}>
                    {link.clickPercentage.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CampaignTimelineChart({ data }: { data: CampaignDetail["timeSeries"] }) {
  const CHART_COLORS = {
    opens: { stroke: "#a27cf6", fill: "#a27cf6" }, // Neon Purple
    clicks: { stroke: "#f297e6", fill: "#f297e6" }, // Neon Pink
  };

  return (
    <div className="bg-surface-50/50 rounded-3xl premium-card p-6 sm:p-8 border border-surface-200/50 ring-1 ring-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-100/0 to-surface-100/50 pointer-events-none" />
      <div className="relative z-10">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradTimelineOpens" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.opens.fill} stopOpacity={0.2} />
                <stop offset="95%" stopColor={CHART_COLORS.opens.fill} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradTimelineClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.clicks.fill} stopOpacity={0.2} />
                <stop offset="95%" stopColor={CHART_COLORS.clicks.fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#3c3c4a" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(val) => formatDate(val, "MMM d")}
              tick={{ fontSize: 11, fill: "#9999ac", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tickFormatter={formatCompact}
              tick={{ fontSize: 11, fill: "#9999ac", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface-50)",
                border: "1px solid var(--color-surface-200)",
                borderRadius: "16px",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                padding: "16px",
              }}
              itemStyle={{ fontSize: "13px", fontWeight: "bold" }}
              labelStyle={{ fontSize: "12px", color: "var(--color-surface-400)", marginBottom: "8px" }}
              cursor={{ stroke: '#3c3c4a', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="opens"
              name="Opens"
              stroke={CHART_COLORS.opens.stroke}
              fill="url(#gradTimelineOpens)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: CHART_COLORS.opens.stroke, style: { filter: "drop-shadow(0px 0px 8px rgba(162,124,246,0.8))" } }}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              name="Clicks"
              stroke={CHART_COLORS.clicks.stroke}
              fill="url(#gradTimelineClicks)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: CHART_COLORS.clicks.stroke, style: { filter: "drop-shadow(0px 0px 8px rgba(242,151,230,0.8))" } }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DeliverabilityHealth({ detail }: { detail: CampaignDetail }) {
  const items = [
    {
      label: "Hard Bounces",
      value: detail.emails.hardBounced,
      icon: <XCircle className="w-4 h-4" />,
      status: detail.emails.hardBounced > detail.emails.sent * 0.02 ? "danger" : "success" as const,
    },
    {
      label: "Soft Bounces",
      value: detail.emails.softBounced,
      icon: <AlertTriangle className="w-4 h-4" />,
      status: detail.emails.softBounced > detail.emails.sent * 0.03 ? "warning" : "success" as const,
    },
    {
      label: "Unsubscribes",
      value: detail.unsubscribes,
      icon: <UserMinus className="w-4 h-4" />,
      status: detail.rates.unsubscribeRate > 0.5 ? "warning" : "success" as const,
    },
    {
      label: "Abuse Reports",
      value: detail.abuseReports,
      icon: <AlertTriangle className="w-4 h-4" />,
      status: detail.abuseReports > 0 ? "danger" : "success" as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`bg-surface-100 rounded-2xl premium-card p-5 sm:p-6 group animate-slide-up stagger-${i + 1}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 ${
                item.status === "success"
                  ? "bg-success-100 text-success-600"
                  : item.status === "warning"
                    ? "bg-warning-100 text-warning-600"
                    : "bg-danger-100 text-danger-600"
              }`}
            >
              <div className="*:stroke-[2.5] *:w-4 *:h-4">{item.icon}</div>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-primary-500 tracking-tight">{formatNumber(item.value)}</p>
          <p className="text-[13px] font-semibold text-surface-500 uppercase tracking-wider mt-1.5">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function CampaignDetailSkeleton() {
  return (
    <AppShell>
      <PageContainer title="">
        <div className="space-y-8">
          <div className="h-48 skeleton-shimmer rounded-2xl" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
          <div className="h-64 skeleton-shimmer rounded-2xl" />
        </div>
      </PageContainer>
    </AppShell>
  );
}
