import type { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  format?: "number" | "percent" | "raw";
  trend?: "up" | "down" | "flat";
  color?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon,
  trend,
  color = "default",
  className = "",
}: StatCardProps) {
  const effectiveTrend =
    trend ?? (change !== undefined ? (change > 0 ? "up" : change < 0 ? "down" : "flat") : undefined);

  const STYLES = {
    default: {
      grad: "group-hover:from-primary-500/20",
      icon: "bg-primary-500/10 text-primary-500 group-hover:bg-primary-500/20 group-hover:text-primary-400 group-hover:shadow-[0_0_20px_rgba(255,102,247,0.4)] ring-primary-500/20",
    },
    success: {
      grad: "group-hover:from-success-500/20",
      icon: "bg-success-500/10 text-success-500 group-hover:bg-success-500/20 group-hover:text-success-400 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] ring-success-500/20",
    },
    warning: {
      grad: "group-hover:from-warning-500/20",
      icon: "bg-warning-500/10 text-warning-500 group-hover:bg-warning-500/20 group-hover:text-warning-400 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] ring-warning-500/20",
    },
    danger: {
      grad: "group-hover:from-danger-500/20",
      icon: "bg-danger-500/10 text-danger-500 group-hover:bg-danger-500/20 group-hover:text-danger-400 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] ring-danger-500/20",
    },
  };

  const style = STYLES[color];

  return (
    <div
      className={`group relative bg-surface-50 rounded-2xl premium-card p-4 sm:p-5 overflow-hidden flex flex-col justify-between min-h-[110px] ${className}`}
    >
      {/* Subtle hover gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent transition-colors duration-500 pointer-events-none ${style.grad}`} />
      
      <div className="relative flex items-start justify-between gap-2 mb-2">
        <p className="text-[11px] font-bold text-surface-400 uppercase tracking-widest leading-snug">
          {label}
        </p>
        {icon && (
          <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] transition-all duration-300 ring-1 ${style.icon}`}>
            <div className="*:w-4 *:h-4 *:stroke-[2]">{icon}</div>
          </div>
        )}
      </div>

      <div className="relative">
        <p className="text-2xl sm:text-3xl font-black text-white tracking-tight animate-count-up drop-shadow-sm">
          {value}
        </p>
        {change !== undefined && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-md transition-colors ${
                effectiveTrend === "up"
                  ? "text-success-700 bg-success-50 group-hover:bg-success-100"
                  : effectiveTrend === "down"
                    ? "text-danger-700 bg-danger-50 group-hover:bg-danger-100"
                    : "text-surface-600 bg-surface-100 group-hover:bg-surface-100"
              }`}
            >
              {effectiveTrend === "up" && <TrendingUp className="w-3 h-3 stroke-[2.5]" />}
              {effectiveTrend === "down" && <TrendingDown className="w-3 h-3 stroke-[2.5]" />}
              {effectiveTrend === "flat" && <Minus className="w-3 h-3 stroke-[2.5]" />}
              {change > 0 ? "+" : ""}
              {change.toFixed(1)}%
            </span>
            {changeLabel && (
              <span className="text-xs font-medium text-surface-400">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-surface-100 rounded-2xl border border-surface-200/60 p-5">
      <div className="space-y-3">
        <div className="h-3 w-20 skeleton-shimmer rounded" />
        <div className="h-8 w-24 skeleton-shimmer rounded" />
        <div className="h-4 w-16 skeleton-shimmer rounded" />
      </div>
    </div>
  );
}
