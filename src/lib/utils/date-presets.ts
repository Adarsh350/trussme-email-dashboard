import { subDays, subMonths, startOfDay, endOfDay } from "date-fns";
import type { DateRange } from "@/lib/analytics/types";

export type DatePresetKey = "7d" | "14d" | "30d" | "60d" | "90d" | "6m" | "1y" | "all";

export interface DatePreset {
  key: DatePresetKey;
  label: string;
  shortLabel: string;
  getRange: () => DateRange;
}

export const DATE_PRESETS: DatePreset[] = [
  {
    key: "7d",
    label: "Last 7 Days",
    shortLabel: "7D",
    getRange: () => ({
      start: startOfDay(subDays(new Date(), 7)),
      end: endOfDay(new Date()),
      label: "Last 7 Days",
    }),
  },
  {
    key: "14d",
    label: "Last 14 Days",
    shortLabel: "14D",
    getRange: () => ({
      start: startOfDay(subDays(new Date(), 14)),
      end: endOfDay(new Date()),
      label: "Last 14 Days",
    }),
  },
  {
    key: "30d",
    label: "Last 30 Days",
    shortLabel: "30D",
    getRange: () => ({
      start: startOfDay(subDays(new Date(), 30)),
      end: endOfDay(new Date()),
      label: "Last 30 Days",
    }),
  },
  {
    key: "60d",
    label: "Last 60 Days",
    shortLabel: "60D",
    getRange: () => ({
      start: startOfDay(subDays(new Date(), 60)),
      end: endOfDay(new Date()),
      label: "Last 60 Days",
    }),
  },
  {
    key: "90d",
    label: "Last 90 Days",
    shortLabel: "90D",
    getRange: () => ({
      start: startOfDay(subDays(new Date(), 90)),
      end: endOfDay(new Date()),
      label: "Last 90 Days",
    }),
  },
  {
    key: "6m",
    label: "Last 6 Months",
    shortLabel: "6M",
    getRange: () => ({
      start: startOfDay(subMonths(new Date(), 6)),
      end: endOfDay(new Date()),
      label: "Last 6 Months",
    }),
  },
  {
    key: "1y",
    label: "Last Year",
    shortLabel: "1Y",
    getRange: () => ({
      start: startOfDay(subMonths(new Date(), 12)),
      end: endOfDay(new Date()),
      label: "Last Year",
    }),
  },
  {
    key: "all",
    label: "All Time",
    shortLabel: "All",
    getRange: () => ({
      start: new Date(2000, 0, 1),
      end: endOfDay(new Date()),
      label: "All Time",
    }),
  },
];

export function getPreset(key: DatePresetKey): DatePreset {
  return DATE_PRESETS.find((p) => p.key === key) ?? DATE_PRESETS[2]; // default 30d
}

export function getDefaultDateRange(): DateRange {
  return getPreset("90d").getRange();
}
