"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("CLIENT RENDER CRASH CAUGHT BY BOUNDARY:", error);
  }, [error]);

  return (
    <div className="p-10 bg-red-50 border border-red-200 rounded-xl m-10">
      <h2 className="text-xl font-bold text-red-800 mb-2">Dashboard Crashed</h2>
      <p className="text-red-600 font-mono text-sm whitespace-pre-wrap">{error.message}</p>
      <p className="text-red-500 font-mono text-xs whitespace-pre-wrap mt-4">{error.stack}</p>
    </div>
  );
}
