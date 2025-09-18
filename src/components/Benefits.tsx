import * as React from 'react';

/* --- Tiny inline icons (no deps) --- */
function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 2 1 7l11 5 11-5L12 2Zm0 9L1 6v5l11 5 11-5V6l-11 5Zm0 6L1 12v5l11 5 11-5v-5l-11 5Z" />
    </svg>
  );
}
function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 2C7 2 3 3.79 3 6v12c0 2.21 4 4 9 4s9-1.79 9-4V6c0-2.21-4-4-9-4Zm0 2c4.42 0 7 .98 7 2s-2.58 2-7 2-7-.98-7-2 2.58-2 7-2Zm0 6c4.42 0 7 .98 7 2s-2.58 2-7 2-7-.98-7-2 2.58-2 7-2Zm0 6c4.42 0 7 .98 7 2s-2.58 2-7 2-7-.98-7-2 2.58-2 7-2Z" />
    </svg>
  );
}
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M9.55 17.54 4.8 12.8l1.41-1.41 3.34 3.34 8.23-8.23 1.41 1.41z" />
    </svg>
  );
}
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 2 19 6v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z" />
    </svg>
  );
}
function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M3 20h18v2H3zM6 10h3v8H6zm5-4h3v12h-3zm5 2h3v10h-3z" />
    </svg>
  );
}
function TableIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M3 4h18v16H3V4zm2 2v3h14V6H5zm14 5H5v7h14v-7zM7 13h4v3H7zm6 0h4v3h-4z" />
    </svg>
  );
}

/* --- Types --- */
export type BenefitItem = {
  title: string;
  text: string;
  color?: 'indigo' | 'blue' | 'emerald' | 'amber' | 'slate' | 'sky' | 'violet' | 'rose' | 'teal';
  Icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
};

type BenefitsProps = {
  title?: string;
  description?: string;
  items?: BenefitItem[];
  id?: string;
  className?: string;
};

/* --- Purge-safe tone mapping (soft duotone + ring) --- */
const TONE_CLASSES: Record<string, string> = {
  indigo: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100',
  sky: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  violet: 'bg-violet-50 text-violet-700 ring-1 ring-violet-100',
  rose: 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
  teal: 'bg-teal-50 text-teal-700 ring-1 ring-teal-100',
  blue: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
  slate: 'bg-slate-50 text-slate-700 ring-1 ring-slate-100', // fallback
};
const colorClasses = (c: string | undefined) => TONE_CLASSES[c ?? 'slate'];

/* --- Default: 6 items (harmônico em 3 colunas) --- */
const DEFAULT_ITEMS: BenefitItem[] = [
  {
    title: 'XLSX multiabas tipadas',
    text: 'Notas, Itens e Totais com CFOP, NCM, CST e alíquotas organizadas.',
    color: 'indigo', // 🟣
    Icon: LayersIcon,
  },
  {
    title: 'Qualidade fiscal',
    text: 'Validações de schema (55/65) e consistência de totais (base × imposto).',
    color: 'sky', // 🔵 claro
    Icon: DatabaseIcon,
  },
  {
    title: 'Sem duplicadas',
    text: 'Deduplicação por chave e marcação de canceladas/denegadas.',
    color: 'emerald', // 🟢
    Icon: CheckIcon,
  },
  {
    title: 'Totais por NCM/CFOP',
    text: 'Visão de totais por NCM e CFOP, pronta para conferência rápida.',
    color: 'violet', // 💜
    Icon: BarChartIcon,
  },
  {
    title: 'Pronto para BI/contabilidade',
    text: 'Também exporta CSV padronizado para planilhas e integrações.',
    color: 'teal', // 🟩 azulado
    Icon: TableIcon,
  },
  {
    title: 'LGPD de verdade',
    text: 'Retenção 48h e botão “Apagar agora” para exclusão imediata.',
    color: 'amber', // 🟡
    Icon: ShieldIcon,
  },
];

export default function Benefits({
  title = 'Por que usar o ChaveXLS?',
  description = 'Planilha fiscal pronta para conferência — com tipagem, validações e deduplicação.',
  items = DEFAULT_ITEMS,
  id = 'benefits',
  className = '',
}: BenefitsProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      <h2
        id={`${id}-heading`}
        className="text-3xl font-bold text-center mb-2"
        style={{ color: 'var(--brand-navy)' }}
      >
        {title}
      </h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
        {description}
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map(({ title, text, color = 'slate', Icon = CheckIcon }) => (
          <div
            key={title}
            className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClasses(color)}`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
