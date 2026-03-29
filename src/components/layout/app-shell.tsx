"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  ArrowLeftRight,
  Menu,
  X,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Mail },
  { href: "/compare", label: "Compare", icon: ArrowLeftRight },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-50 selection:bg-primary-200 selection:text-primary-900">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-[260px] lg:flex-col lg:fixed lg:inset-y-0 z-30">
        <div className="flex flex-col flex-1 bg-surface-100 text-surface-200 border-r border-white-[0.04]">
          <div className="flex items-center gap-3 px-6 py-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-b from-primary-400 to-primary-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-1 ring-white/10">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-white">Mailchimp Live</h1>
              <p className="text-[9px] text-surface-500 uppercase tracking-widest font-medium mt-0.5">Email Marketing Dashboard</p>
            </div>
          </div>
          
          <div className="px-4 py-2">
            <SidebarNav />
          </div>
          
          <div className="px-4 py-2 mt-4 border-t border-white/[0.04]">
            <div className="flex items-center gap-2 px-3 py-4">
              <Sparkles className="w-3.5 h-3.5 text-primary-400 shrink-0" />
              <div className="flex flex-col">
                <p className="text-[11px] text-surface-500 font-medium">built by Iyara Labs</p>
                <p className="text-[9px] text-surface-600 uppercase tracking-widest mt-0.5 font-semibold">Powered by Mailchimp API</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header (glassmorphic) */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-surface-100/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-b from-primary-400 to-primary-600 shadow-glow">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white text-sm font-semibold tracking-tight">Mailchimp Live</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-surface-300 p-1.5 hover:text-white hover:bg-surface-100/10 rounded-lg transition-colors ring-hover"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-14 bottom-0 w-[260px] bg-surface-100 border-r border-white/[0.04] animate-slide-in-right shadow-2xl">
            <div className="px-4 py-4">
              <SidebarNav onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:pl-[260px] w-full min-w-0">
        <div className="pt-14 lg:pt-0 max-w-[1600px] mx-auto">{children}</div>
      </main>
    </div>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 ${
              isActive
                ? "bg-primary-500/10 text-primary-400 font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ring-1 ring-primary-500/20"
                : "text-surface-400 font-medium hover:text-surface-100 hover:bg-surface-100/[0.03]"
            }`}
          >
            <Icon className={`w-[18px] h-[18px] transition-transform duration-300 ${isActive ? "text-primary-400" : "group-hover:scale-110"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
