"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { TimeSeriesPoint } from "@/lib/analytics/types";
import { formatChartDate, formatCompact } from "@/lib/utils/format";

interface TrendChartsProps {
  data: TimeSeriesPoint[];
}

const CHART_COLORS = {
  opens: { stroke: "#a27cf6", fill: "#a27cf6" }, // Neon Purple
  clicks: { stroke: "#f297e6", fill: "#f297e6" }, // Neon Pink
  delivered: { stroke: "#b99dff", fill: "#b99dff" }, // Light Purple
  unsubscribes: { stroke: "#ffb088", fill: "#ffb088" }, // Peach
  bounces: { stroke: "#f43f5e", fill: "#f43f5e" }, // Red
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload) return null;

  return (
    <div className="glass-panel rounded-xl p-3.5 min-w-[180px] animate-scale-in">
      <p className="text-xs font-semibold text-surface-500 mb-3 tracking-wide uppercase">
        {label ? formatChartDate(label) : ""}
      </p>
      <div className="space-y-2">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full shadow-sm"
                style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}80` }}
              />
              <span className="text-[13px] font-medium text-surface-600 capitalize">{entry.name}</span>
            </div>
            <span className="text-[13px] font-bold text-primary-500">
              {formatCompact(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrendCharts({ data }: TrendChartsProps) {
  if (data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <ChartPanel title="Delivery & Health" subtitle="Tracking list quality and deliverability">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradDelivered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.delivered.fill} stopOpacity={0.2} />
                <stop offset="95%" stopColor={CHART_COLORS.delivered.fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#3c3c4a" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatChartDate}
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
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3c3c4a', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Legend
              wrapperStyle={{ fontSize: "13px", fontWeight: 500, paddingTop: "16px", color: '#dfdfe6' }}
              iconType="circle"
              iconSize={8}
            />
            <Area
              type="monotone"
              dataKey="delivered"
              stroke={CHART_COLORS.delivered.stroke}
              fill="url(#gradDelivered)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: CHART_COLORS.delivered.stroke }}
            />
            <Area
              type="monotone"
              dataKey="bounces"
              stroke={CHART_COLORS.bounces.stroke}
              fill="none"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="unsubscribes"
              stroke={CHART_COLORS.unsubscribes.stroke}
              fill="none"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel title="Opens & Clicks" subtitle="Engagement across campaigns">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradOpens" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.opens.fill} stopOpacity={0.2} />
                <stop offset="95%" stopColor={CHART_COLORS.opens.fill} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.clicks.fill} stopOpacity={0.2} />
                <stop offset="95%" stopColor={CHART_COLORS.clicks.fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#3c3c4a" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatChartDate}
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
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3c3c4a', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Legend
              wrapperStyle={{ fontSize: "13px", fontWeight: 500, paddingTop: "16px", color: '#dfdfe6' }}
              iconType="circle"
              iconSize={8}
            />
            <Area
              type="monotone"
              dataKey="opens"
              stroke={CHART_COLORS.opens.stroke}
              fill="url(#gradOpens)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: CHART_COLORS.opens.stroke }}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke={CHART_COLORS.clicks.stroke}
              fill="url(#gradClicks)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: CHART_COLORS.clicks.stroke }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartPanel>
    </div>
  );
}

function ChartPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 group relative overflow-hidden transition-all duration-500 hover:ring-2 hover:ring-primary-500/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[60px] -z-10 group-hover:bg-primary-500/10 transition-colors duration-700" />
      <div className="mb-6 relative z-10">
        <h3 className="text-[15px] font-extrabold tracking-tight text-primary-500 group-hover:text-primary-600 transition-colors">{title}</h3>
        <p className="text-[13px] font-medium text-surface-500 mt-1">{subtitle}</p>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-surface-100 rounded-2xl border border-surface-200/60 p-6">
      <div className="space-y-3 mb-4">
        <div className="h-4 w-32 skeleton-shimmer rounded" />
        <div className="h-3 w-48 skeleton-shimmer rounded" />
      </div>
      <div className="h-[280px] skeleton-shimmer rounded-xl" />
    </div>
  );
}
