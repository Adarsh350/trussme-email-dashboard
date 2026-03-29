"use client";

import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 px-4">
      <div className="w-full max-w-sm text-center">
        <div className="w-14 h-14 mx-auto skeleton-shimmer rounded-2xl mb-4" />
        <div className="h-8 w-48 mx-auto skeleton-shimmer rounded mb-2" />
        <div className="h-4 w-64 mx-auto skeleton-shimmer rounded" />
      </div>
    </div>
  );
}
