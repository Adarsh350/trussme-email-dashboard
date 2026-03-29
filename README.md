# Mailchimp Live Campaign Dashboard

A premium, client-facing analytics dashboard that transforms Mailchimp campaign reporting into an interactive, presentation-ready experience.

![Built with Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### Dashboard Overview
- **KPI Cards** — Campaign count, emails sent, delivery rate, open rate, click rate, click-to-open rate, unsubscribe rate, bounce rate
- **Trend Charts** — Opens, clicks, delivered volume, bounces, and unsubscribes over time
- **Insight Cards** — Deterministic, plain-English observations (best campaign, unsub spikes, deliverability health, engagement trends)
- **Date Filtering** — Presets for 7D, 30D, 90D, 6M, 1Y, and All Time

### Campaign Explorer
- **Sortable Table** — Sort by send date, volume, open rate, click rate, or unsub rate
- **Search** — Filter by campaign name, subject line, or list name
- **Pagination** — Clean paginated view with per-page counts
- **Drill-down** — Click any campaign to see full details

### Campaign Detail
- **Hero Summary** — Campaign name, subject, send time, audience, recipients, delivered count
- **Metric Cards** — Open rate, click rate, CTOR, delivery rate, unsub rate, bounce rate
- **Engagement Funnel** — Visual funnel from sent → delivered → opened → clicked
- **Top Links** — Click performance by URL with percentage contribution
- **Domain Performance** — Email client/provider breakdown bar chart
- **Deliverability Health** — Hard bounces, soft bounces, unsubscribes, abuse reports with status indicators
- **Narrative Summary** — Automated rules-based performance analysis

### Compare Mode
- **Campaign vs Campaign** — Side-by-side metric comparison with delta badges
- **What Changed** — Narrative highlights of significant differences

### Security
- **Password Gate** — Optional env-var password protection with cookie-based sessions
- **Server-side Only** — Mailchimp API key never exposed to browser

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm

### 1. Clone and Install

```bash
cd AntiGravity
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required for live data (optional for development — mock data used if absent)
MAILCHIMP_API_KEY=your-api-key-us21
MAILCHIMP_SERVER_PREFIX=us21

# Optional — set to protect dashboard with a password
DASHBOARD_PASSWORD=your-password
```

> **Finding your Mailchimp API key:** Go to Mailchimp → Account → Extras → API Keys. The server prefix is the part after the dash (e.g., `us21` from `abc123-us21`).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app works with mock data when no API key is configured.

### 4. Production Build

```bash
npm run build
npm start
```

---

## Deployment

### Vercel (Recommended)

1. Push to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `MAILCHIMP_API_KEY`
   - `MAILCHIMP_SERVER_PREFIX`
   - `DASHBOARD_PASSWORD` (optional)
4. Deploy

The app is optimized for Vercel Hobby (free tier):
- Server functions stay within 60s execution limit
- 5-minute cache revalidation reduces API calls
- Static pages pre-rendered at build time

### Cloudflare Pages (Alternative)

1. Connect your Git repo to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Add environment variables
5. Deploy

---

## Tech Stack

| Layer | Technology | Cost |
|---|---|---|
| Framework | Next.js 15 (App Router) | Free |
| Language | TypeScript 5.7 | Free |
| Styling | Tailwind CSS 4 | Free |
| Charts | Recharts | Free |
| Icons | Lucide React | Free |
| Validation | Zod | Free |
| Dates | date-fns | Free |
| Deployment | Vercel Hobby | Free |

**No paid services, databases, or API dependencies beyond Mailchimp.**

---

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Executive overview
│   ├── campaigns/          # Campaign explorer + detail
│   ├── compare/            # Campaign comparison
│   ├── login/              # Password gate
│   └── api/                # Server-side API routes
├── components/
│   ├── ui/                 # Reusable primitives (StatCard, Badge, states)
│   ├── layout/             # AppShell, PageContainer
│   ├── dashboard/          # Charts, insights, date filter
│   └── campaigns/          # Campaign table
├── lib/
│   ├── mailchimp/          # API client, types, endpoints, mock data
│   ├── analytics/          # Normalization, insights engine, comparisons
│   └── utils/              # Formatting, date presets
└── middleware.ts           # Password gate middleware
```

### Key Design Decisions

- **Server-side API access only** — Mailchimp key never reaches the browser
- **Mock data fallback** — App renders with realistic fixture data during dev/build
- **5-minute cache revalidation** — Balances freshness with API rate limits
- **Deterministic insights** — Rules-based, not LLM-powered; no external AI costs
- **No database** — All data derived from Mailchimp API at request time

---

## Mailchimp API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `GET /campaigns` | Campaign list with report summaries |
| `GET /reports` | All campaign reports with full metrics |
| `GET /reports/{id}` | Individual campaign report detail |
| `GET /reports/{id}/click-details` | Link-level click performance |
| `GET /reports/{id}/domain-performance` | Email client/domain breakdown |
| `GET /reports/{id}/unsubscribed` | Unsubscribe details per campaign |

All endpoints are **read-only** — the dashboard cannot modify your Mailchimp data.

---

## Known Limitations

- **V1 is single-tenant** — One Mailchimp account per deployment
- **No persistent storage** — Refreshing resets client-side state (date filter, search)
- **Campaign limit** — Fetches up to 100 campaigns per API call
- **Password gate is simple** — Not suitable for multi-user access control; use for client-sharing only
- **No real-time updates** — Data refreshes on page load with 5-minute cache

---

## License

MIT
