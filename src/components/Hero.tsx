import * as React from 'react';

/** Lightweight inline icon for trust chips */
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M9.55 17.54 4.8 12.8l1.41-1.41 3.34 3.34 8.23-8.23 1.41 1.41z" />
    </svg>
  );
}

/** Tone → explicit Tailwind classes (no template strings to avoid purge issues) */
function chipToneClasses(tone: 'emerald' | 'blue' | 'amber' | 'slate' = 'blue') {
  switch (tone) {
    case 'emerald':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'amber':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'slate':
      return 'bg-slate-50 text-slate-700 border border-slate-100';
    case 'blue':
    default:
      return 'bg-blue-50 text-blue-700 border border-blue-100';
  }
}

export type HeroChip = {
  label: string;
  tone?: 'emerald' | 'blue' | 'amber' | 'slate';
  Icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
};

type HeroProps = {
  overline?: string;                 // small brand/tag above the H1
  title: React.ReactNode;            // H1 (can include <br/>)
  subtitle?: React.ReactNode;        // below H1
  helperText?: React.ReactNode;      // small line under CTAs
  chips?: HeroChip[];                // trust chips row
  primary: { label: string; onClick: () => void; ariaDescribedBy?: string };
  secondary?: { label: string; onClick: () => void; ariaDescribedBy?: string };
  /** Optional secondary link near CTAs (e.g., “Ver amostra de XLSX”) */
  sampleLink?: { href: string; label?: string; onClick?: () => void } | null;
  /** Extra classes to control max width/spacing from the page */
  className?: string;
};

export default function Hero({
  overline,
  title,
  subtitle,
  helperText,
  chips = [],
  primary,
  secondary,
  sampleLink = null,
  className = '',
}: HeroProps) {
  const sectionId = 'hero-heading';

  return (
    <section
      aria-labelledby={sectionId}
      className="
        relative overflow-hidden border-b
        bg-gradient-to-b from-blue-50/60 via-white to-white
      "
    >
      {/* Decorative radial blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 w-[60rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(59,130,246,0.25), transparent 70%)' }}
      />

      <div className={`relative text-center ${className}`}>
        {overline ? (
          <p className="tracking-wide text-sm font-semibold mb-2" style={{ color: 'var(--brand-navy)' }}>
            {overline}
          </p>
        ) : null}

        <h1 id={sectionId} className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: 'var(--brand-navy)' }}>
          {title}
        </h1>

        {subtitle ? (
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        ) : null}

        {/* CTAs */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={primary.onClick}
            aria-describedby={primary.ariaDescribedBy}
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium shadow-sm bg-[var(--brand-navy)] text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {primary.label}
          </button>

          {secondary ? (
            <button
              type="button"
              onClick={secondary.onClick}
              aria-describedby={secondary.ariaDescribedBy}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium border border-[var(--brand-navy)] text-[var(--brand-navy)] hover:bg-[var(--brand-navy)]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              {secondary.label}
            </button>
          ) : null}

          {sampleLink ? (
            <a
              href={sampleLink.href}
              onClick={sampleLink.onClick}
              className="ml-2 underline text-sm text-[var(--brand-navy)]"
            >
              {sampleLink.label ?? 'Ver amostra de XLSX'}
            </a>
          ) : null}
        </div>

        {helperText ? (
          <p className="mt-3 text-sm text-muted-foreground">{helperText}</p>
        ) : null}

        {/* Trust chips */}
        {chips.length > 0 ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            {chips.map(({ label, tone = 'blue', Icon = CheckIcon }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${chipToneClasses(tone)}`}
              >
                <Icon className="w-4 h-4" /> {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
