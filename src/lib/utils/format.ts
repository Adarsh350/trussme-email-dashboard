import { format, formatDistanceToNow, parseISO, isValid } from "date-fns";

/**
 * Format a number with locale-appropriate separators
 */
export function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 10_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toLocaleString("en-US");
}

/**
 * Format a number as a compact integer
 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

/**
 * Format a rate as percentage with specified decimals
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a rate that is already in percentage form
 */
export function formatRate(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a change as a signed percentage
 */
export function formatChange(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string, pattern: string = "MMM d, yyyy"): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "—";
    return format(date, pattern);
  } catch {
    return "—";
  }
}

/**
 * Format a date as relative time
 */
export function formatRelativeDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "—";
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return "—";
  }
}

/**
 * Format a date for chart axis labels
 */
export function formatChartDate(dateString: string): string {
  return formatDate(dateString, "MMM d");
}

/**
 * Get a safe percentage between two numbers
 */
export function safePercent(numerator: number, denominator: number): number {
  if (denominator === 0) return 0;
  return (numerator / denominator) * 100;
}

/**
 * Calculate percentage change between two values
 */
export function percentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Generate a color based on a metric value relative to thresholds
 */
export function metricColor(
  value: number,
  goodThreshold: number,
  warnThreshold: number,
  higherIsBetter: boolean = true
): "success" | "warning" | "danger" {
  if (higherIsBetter) {
    if (value >= goodThreshold) return "success";
    if (value >= warnThreshold) return "warning";
    return "danger";
  }
  if (value <= goodThreshold) return "success";
  if (value <= warnThreshold) return "warning";
  return "danger";
}
