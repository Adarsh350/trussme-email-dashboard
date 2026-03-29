"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { CampaignSummary } from "@/lib/analytics/types";
import { formatDate, formatNumber, formatRate } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/states";

interface CampaignTableProps {
  campaigns: CampaignSummary[];
  pageSize?: number;
}

type SortField = "sendTime" | "openRate" | "clickRate" | "sent" | "unsubscribeRate";
type SortDir = "asc" | "desc";

export function CampaignTable({ campaigns, pageSize = 10 }: CampaignTableProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("sendTime");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let result = campaigns;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subjectLine.toLowerCase().includes(q) ||
          c.listName.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      let aVal: number, bVal: number;
      switch (sortField) {
        case "sendTime":
          aVal = new Date(a.sendTime).getTime();
          bVal = new Date(b.sendTime).getTime();
          break;
        case "openRate":
          aVal = a.rates.openRate;
          bVal = b.rates.openRate;
          break;
        case "clickRate":
          aVal = a.rates.clickRate;
          bVal = b.rates.clickRate;
          break;
        case "sent":
          aVal = a.emails.sent;
          bVal = b.emails.sent;
          break;
        case "unsubscribeRate":
          aVal = a.rates.unsubscribeRate;
          bVal = b.rates.unsubscribeRate;
          break;
        default:
          return 0;
      }
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [campaigns, search, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(0);
  };

  if (campaigns.length === 0) {
    return <EmptyState title="No campaigns yet" description="Campaign data will appear here once reports are available." />;
  }

  return (
    <div className="bg-surface-50 rounded-2xl premium-card overflow-hidden">
      {/* Search bar */}
      <div className="px-4 sm:px-6 py-4 border-b border-surface-200 bg-surface-100">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="w-full pl-10 pr-4 py-2 text-sm bg-surface-50 text-white placeholder-surface-500 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200 bg-surface-100">
              <th className="text-left px-4 sm:px-6 py-3.5 text-xs font-semibold text-white uppercase tracking-wider">
                Campaign
              </th>
              <SortableHeader field="sendTime" current={sortField} dir={sortDir} onClick={toggleSort}>
                Sent
              </SortableHeader>
              <SortableHeader field="sent" current={sortField} dir={sortDir} onClick={toggleSort}>
                Volume
              </SortableHeader>
              <SortableHeader field="openRate" current={sortField} dir={sortDir} onClick={toggleSort}>
                Open Rate
              </SortableHeader>
              <SortableHeader field="clickRate" current={sortField} dir={sortDir} onClick={toggleSort}>
                Click Rate
              </SortableHeader>
              <SortableHeader field="unsubscribeRate" current={sortField} dir={sortDir} onClick={toggleSort}>
                Unsubs
              </SortableHeader>
              <th className="px-4 sm:px-6 py-3.5 text-xs font-semibold text-surface-500 uppercase tracking-wider text-right">
                Abuse Reports
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100/50">
            {pageData.map((c, i) => (
              <tr
                key={c.id}
                className="group hover:bg-primary-50/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <td className="px-4 sm:px-6 py-4 max-w-[280px]">
                  <Link href={`/campaigns/${c.id}`} className="block">
                    <p className="font-semibold text-primary-400 truncate group-hover:text-primary-600 transition-colors cursor-pointer">
                      {c.title}
                    </p>
                    <p className="text-xs font-medium text-surface-500 truncate mt-0.5">
                      {c.subjectLine}
                    </p>
                  </Link>
                </td>
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                  <span className="text-surface-600">{formatDate(c.sendTime, "MMM d")}</span>
                </td>
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                  <span className="text-surface-700 font-medium">{formatNumber(c.emails.sent)}</span>
                </td>
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                  <RateBadge value={c.rates.openRate} good={30} warn={20} />
                </td>
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                  <RateBadge value={c.rates.clickRate} good={10} warn={5} />
                </td>
                <td className="px-4 sm:px-6 py-3.5 whitespace-nowrap">
                  <span className="text-surface-600">{formatRate(c.rates.unsubscribeRate, 2)}</span>
                </td>
                <td className="px-4 sm:px-6 py-3.5 text-right whitespace-nowrap">
                  <span className="text-surface-600">{c.abuseReports}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 sm:px-6 py-3 border-t border-surface-100 flex items-center justify-between">
          <p className="text-xs text-surface-500">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of{" "}
            {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`min-w-[28px] h-7 text-xs font-medium rounded-lg transition-colors ${
                  page === i
                    ? "bg-primary-600 text-white"
                    : "text-surface-500 hover:bg-surface-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SortableHeader({
  field,
  current,
  dir: _dir,
  onClick,
  children,
}: {
  field: SortField;
  current: SortField;
  dir: SortDir;
  onClick: (field: SortField) => void;
  children: React.ReactNode;
}) {
  const isActive = field === current;
  return (
    <th className="px-4 sm:px-6 py-3 whitespace-nowrap">
      <button
        onClick={() => onClick(field)}
        className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
          isActive ? "text-primary-600" : "text-surface-500 hover:text-surface-700"
        }`}
      >
        {children}
        <ArrowUpDown className={`w-3 h-3 ${isActive ? "opacity-100" : "opacity-40"}`} />
      </button>
    </th>
  );
}

function RateBadge({
  value,
  good,
  warn,
}: {
  value: number;
  good: number;
  warn: number;
}) {
  const variant =
    value >= good ? "success" : value >= warn ? "warning" : "danger";
  return (
    <Badge variant={variant} size="sm">
      {formatRate(value)}
    </Badge>
  );
}

export function CampaignTableSkeleton() {
  return (
    <div className="bg-surface-100 rounded-2xl border border-surface-200/60 overflow-hidden">
      <div className="px-6 py-4 border-b border-surface-100">
        <div className="h-9 w-64 skeleton-shimmer rounded-xl" />
      </div>
      <div className="p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-4 flex-1 skeleton-shimmer rounded" />
            <div className="h-4 w-16 skeleton-shimmer rounded" />
            <div className="h-4 w-16 skeleton-shimmer rounded" />
            <div className="h-4 w-16 skeleton-shimmer rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
