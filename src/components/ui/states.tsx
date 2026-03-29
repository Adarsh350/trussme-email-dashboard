import { AlertCircle, Inbox, RefreshCw, WifiOff } from "lucide-react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 animate-fade-in">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-50 text-surface-200 mb-4 ring-1 ring-white/10 shadow-lg">
        {icon ?? <Inbox className="w-7 h-7 text-primary-500" />}
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-surface-400 max-w-md mb-6">{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 animate-fade-in">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-danger-50 text-danger-500 mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">Something went wrong</h3>
      <p className="text-sm text-surface-400 max-w-md mb-6">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}

export function OfflineState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 animate-fade-in">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-warning-50 text-warning-500 mb-4">
        <WifiOff className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">No Connection</h3>
      <p className="text-sm text-surface-400 max-w-md">
        Unable to reach the Mailchimp API. Check your connection and API credentials.
      </p>
    </div>
  );
}

export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3 animate-fade-in">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-shimmer rounded-lg"
          style={{
            height: "16px",
            width: `${85 - i * 15}%`,
          }}
        />
      ))}
    </div>
  );
}
