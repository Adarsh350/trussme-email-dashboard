import type { Insight } from "@/lib/analytics/types";
import {
  TrendingUp,
  AlertTriangle,
  Info,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface InsightCardsProps {
  insights: Insight[];
}

const ICON_MAP = {
  success: TrendingUp,
  warning: AlertTriangle,
  info: Info,
  danger: AlertCircle,
};

const STYLE_MAP = {
  success: {
    bg: "bg-success-50/50",
    border: "border-success-400/20",
    iconBg: "bg-success-100",
    iconColor: "text-success-600",
    accent: "text-success-600",
    line: "bg-success-500/30 group-hover:bg-success-400 group-hover:shadow-[0_0_15px_rgba(74,222,128,0.5)]",
    glow: "hover:ring-2 hover:ring-success-500/30 hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]",
  },
  warning: {
    bg: "bg-warning-50/50",
    border: "border-warning-400/20",
    iconBg: "bg-warning-100",
    iconColor: "text-warning-600",
    accent: "text-warning-600",
    line: "bg-warning-500/30 group-hover:bg-warning-400 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.5)]",
    glow: "hover:ring-2 hover:ring-warning-500/30 hover:shadow-[0_0_24px_rgba(245,158,11,0.2)]",
  },
  info: {
    bg: "bg-primary-50/50",
    border: "border-primary-400/20",
    iconBg: "bg-primary-100",
    iconColor: "text-primary-600",
    accent: "text-primary-600",
    line: "bg-primary-500/30 group-hover:bg-primary-400 group-hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]",
    glow: "hover:ring-2 hover:ring-primary-500/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.2)]",
  },
  danger: {
    bg: "bg-danger-50/50",
    border: "border-danger-400/20",
    iconBg: "bg-danger-100",
    iconColor: "text-danger-600",
    accent: "text-danger-600",
    line: "bg-danger-500/30 group-hover:bg-danger-400 group-hover:shadow-[0_0_15px_rgba(2fb,113,133,0.5)]",
    glow: "hover:ring-2 hover:ring-danger-500/30 hover:shadow-[0_0_24px_rgba(244,63,94,0.2)]",
  },
};

export function InsightCards({ insights }: InsightCardsProps) {
  if (insights.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {insights.slice(0, 4).map((insight, i) => (
        <InsightCard key={insight.id} insight={insight} index={i} />
      ))}
    </div>
  );
}

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const Icon = ICON_MAP[insight.type];
  const styles = STYLE_MAP[insight.type];

  return (
    <div
      className={`relative glass-panel rounded-2xl p-5 sm:p-6 animate-slide-up stagger-${index + 1} overflow-hidden group transition-all duration-400 cursor-default hover:bg-surface-100/60 ${styles.glow}`}
    >
      <div className={`absolute top-0 left-0 w-1.5 h-full ${styles.line} group-hover:w-3 transition-all duration-300`} />
      <div className="flex items-start gap-4 pl-2">
        <div
          className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${styles.iconBg} ${styles.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5 gap-2">
            <h4 className="text-[15px] font-extrabold text-white tracking-tight leading-snug">
              {insight.title}
            </h4>
            {insight.value && (
              <span className={`flex-shrink-0 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${styles.bg} ${styles.accent} tracking-wide uppercase border border-current/10`}>
                {insight.value}
              </span>
            )}
          </div>
          <p className="text-[13px] leading-relaxed text-surface-300 font-medium">
            {insight.description}
          </p>
          {insight.campaignId && (
            <Link
              href={`/campaigns/${insight.campaignId}`}
                className={`inline-flex items-center gap-1.5 mt-3 text-sm font-extrabold ${styles.accent} hover:brightness-125 transition-all group/link`}
              >
                View details <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
