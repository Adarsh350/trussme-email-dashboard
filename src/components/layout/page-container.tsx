export function PageContainer({
  title,
  subtitle,
  children,
  actions,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-surface-50">
      {/* Novoslo-inspired deep radial background orbs */}
      <div className="radial-glow -top-64 -left-64 opacity-60 mix-blend-multiply" />
      <div className="radial-glow accent -bottom-64 -right-64 opacity-50 mix-blend-multiply" />
      
      <div className="relative z-10">
        <header className="sticky top-0 lg:top-0 z-20 bg-surface-50/60 backdrop-blur-2xl border-b border-surface-200 shadow-sm transition-all duration-300">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm font-medium text-surface-500 mt-0.5">{subtitle}</p>
                )}
              </div>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
          </div>
        </header>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Section({
  title,
  subtitle,
  children,
  action,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section>
      {(title || action) && (
        <div className="flex items-center justify-between mb-5">
          <div>
            {title && (
               <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm font-medium text-surface-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
