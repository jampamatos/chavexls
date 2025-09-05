import * as React from 'react';

type PlanId = 'starter' | 'business';

type Plan = {
  id: PlanId;
  name: string;
  limit: string;            // ex.: "até 100 XML/mês"
  priceMonthly: number;     // ex.: 19.90
  bullets: string[];
  badge?: string;           // ex.: "Mais Popular"
  highlightTone?: 'indigo' | 'blue' | 'emerald';
  ctaLabel?: string;        // override label for button
};

type PricingProps = {
  title?: string;
  description?: string;
  plans: Plan[];
  /** 'founder' = shows crossed-out price + discounted price; 'regular' = normal price */
  planVariant?: 'founder' | 'regular';
  /** Discount percentage for the founding price (e.g. 0.30) */
  founderDiscountPct?: number;
  /** Note/footer below the cards */
  footnote?: string;
  /** Callback when the user selects a plan (the page will anchor + track) */
  onSelect(planId: PlanId): void;
  /** External classes (spacing/width defined on the page) */
  className?: string;
};

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M9.55 17.54 4.8 12.8l1.41-1.41 3.34 3.34 8.23-8.23 1.41 1.41z" />
    </svg>
  );
}

function ringTone(tone: Plan['highlightTone']) {
  switch (tone) {
    case 'indigo':  return 'ring-2 ring-indigo-500 border-indigo-500';
    case 'blue':    return 'ring-2 ring-blue-500 border-blue-500';
    case 'emerald': return 'ring-2 ring-emerald-500 border-emerald-500';
    default:        return '';
  }
}

function badgeTone(tone: Plan['highlightTone']) {
  switch (tone) {
    case 'indigo':  return 'bg-indigo-600';
    case 'blue':    return 'bg-blue-600';
    case 'emerald': return 'bg-emerald-600';
    default:        return 'bg-emerald-600';
  }
}

function formatBRL(n: number) {
  try {
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
  } catch {
    return `R$ ${n.toFixed(2).replace('.', ',')}`;
  }
}

export default function Pricing({
  title = 'Planos',
  description = 'Escolha o plano ideal para o volume da sua empresa.',
  plans,
  planVariant = 'regular',
  founderDiscountPct = 0.3,
  footnote,
  onSelect,
  className = '',
}: PricingProps) {
  const founderMode = planVariant === 'founder' && founderDiscountPct > 0;

  return (
    <section aria-labelledby="pricing-heading" className={className}>
      <h2
        id="pricing-heading"
        className="text-3xl font-bold text-center mb-2"
        style={{ color: 'var(--brand-navy)' }}
      >
        {title}
      </h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
        {description} {founderMode ? 'Sem cobrança durante o Beta.' : 'Sem cobrança durante o Beta.'}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((p) => {
          const original = p.priceMonthly;
          const discounted = Math.round(original * (1 - founderDiscountPct) * 100) / 100;

          const showDiscount = founderMode; // applies to both cards when in founder mode
          const pricePrimary = showDiscount ? discounted : original;

          const ctaText = p.ctaLabel ?? (founderMode ? 'Garantir preço fundador' : 'Escolher plano');

          return (
            <div
              key={p.id}
              className={`rounded-3xl border p-6 md:p-8 shadow-sm bg-white relative transition-all hover:-translate-y-0.5 hover:shadow-md ${p.badge ? 'pt-8' : ''} ${p.badge ? ringTone(p.highlightTone || 'emerald') : ''}`}
            >
              {/* "Most Popular" Badge */}
              {p.badge ? (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs rounded-full px-3 py-1 text-white shadow ${badgeTone(p.highlightTone || 'emerald')}`}>
                  {p.badge}
                </span>
              ) : null}

              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.limit}</p>

              {/* Pricing block */}
              <div className="mb-4">
                {showDiscount ? (
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-extrabold text-emerald-700">
                      {formatBRL(pricePrimary)}
                    </span>
                    <span className="text-base font-medium text-muted-foreground">/ mês</span>
                  </div>
                ) : (
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-extrabold">{formatBRL(pricePrimary)}</span>
                    <span className="text-base font-medium text-muted-foreground">/ mês</span>
                  </div>
                )}

                {showDiscount ? (
                  <div className="mt-1 text-sm">
                    <span className="line-through text-muted-foreground mr-2">
                      {formatBRL(original)} / mês
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs border border-emerald-100">
                      Preço fundador (-{Math.round(founderDiscountPct * 100)}%)
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Bullets */}
              <ul className="space-y-2 mb-6 text-sm">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600" /> {b}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className="w-full inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium shadow-sm bg-[var(--brand-navy)] text-white hover:opacity-90"
              >
                {ctaText}
              </button>
            </div>
          );
        })}
      </div>

      {footnote ? (
        <p className="text-center text-xs text-muted-foreground mt-6">{footnote}</p>
      ) : null}
    </section>
  );
}
