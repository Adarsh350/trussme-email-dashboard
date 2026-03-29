"use client";

import { useState } from "react";
import type { DatePresetKey } from "@/lib/utils/date-presets";
import { DATE_PRESETS } from "@/lib/utils/date-presets";

interface DateFilterProps {
  selected: DatePresetKey;
  onChange: (key: DatePresetKey) => void;
}

export function DateFilter({ selected, onChange }: DateFilterProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-surface-100/5 backdrop-blur-md border border-surface-200/50 rounded-2xl shadow-inner">
      {DATE_PRESETS.filter(p => ["7d","30d","90d","6m","1y","all"].includes(p.key)).map((preset) => {
        const isActive = selected === preset.key;
        return (
          <button
            key={preset.key}
            onClick={() => onChange(preset.key)}
            className={`relative px-4 py-1.5 text-xs font-bold rounded-xl transition-all duration-300 ease-out ${
              isActive
                ? "text-primary-500 shadow-[0_4px_12px_-2px_rgba(255,102,247,0.25)] ring-1 ring-primary-500/30"
                : "text-surface-500 hover:text-white hover:bg-surface-200"
            }`}
          >
            {isActive && (
              <div className="absolute inset-0 bg-surface-100 rounded-xl shadow-sm -z-10" />
            )}
            {preset.shortLabel}
          </button>
        );
      })}
    </div>
  );
}

export function useDateFilter(initial: DatePresetKey = "90d") {
  const [selected, setSelected] = useState<DatePresetKey>(initial);
  const preset = DATE_PRESETS.find((p) => p.key === selected) ?? DATE_PRESETS[2];
  const range = preset.getRange();

  return { selected, setSelected, range, preset };
}
