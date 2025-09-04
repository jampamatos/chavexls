import * as React from 'react';

/** Inline icons (leve, sem deps) */
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

export type BenefitItem = {
  title: string;
  text: string;
  /** Chip color */
  color?: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
};

type BenefitsProps = {
  /** Section title (default: "O que você recebe") */
  title?: string;
  /** Optional subtitle under the title */
  description?: string;
  /** Items; if omitted, uses our default trio */
  items?: BenefitItem[];
  /** Optional section id for deep-linking */
  id?: string;
  /** Extra classes for the outer section */
  className?: string;
};

const DEFAULT_ITEMS: BenefitItem[] = [
  {
    title: 'Multiabas Organizadas',
    text: 'Itens, totais, impostos e canceladas em abas separadas com tipagem correta.',
    color: 'red',
    Icon: LayersIcon,
  },
  {
    title: 'CFOP/NCM/CST',
    text: 'Códigos fiscais organizados e validados para análise tributária precisa.',
    color: 'indigo',
    Icon: DatabaseIcon,
  },
  {
    title: 'Deduplicação',
    text: 'Remoção automática de duplicatas por chave, garantindo dados únicos.',
    color: 'emerald',
    Icon: CheckIcon,
  },
];

function colorClasses(c: BenefitItem['color']) {
  return `bg-${c}-100 text-${c}-700`
}

/** Reusable Benefits section */
export default function Benefits({
  title = 'O que você recebe',
  description = 'Planilha fiscal completa, pronta para conferência e conciliação contábil.',
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
        {items.map(({ title, text, color, Icon = CheckIcon }) => (
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
