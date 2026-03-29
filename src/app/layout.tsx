import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campaign Dashboard — Mailchimp Analytics",
  description:
    "Interactive campaign analytics dashboard powered by Mailchimp reporting data. Track opens, clicks, deliverability, and engagement across all your campaigns.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-50 text-surface-800 antialiased">
        {children}
      </body>
    </html>
  );
}
