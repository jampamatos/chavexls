import * as React from 'react';

/** Inline icons with no external deps */
function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M9 3h6a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v3H3V8a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2Zm0 3h6V5H9v1Zm13 6v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6h7v1h6v-1h7Z" />
    </svg>
  );
}
function StoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M3 7h18l-1 4a4 4 0 0 1-8 0 4 4 0 1 1-8 0L3 7Zm2 6.5V21h14v-7.5a5.9 5.9 0 0 1-2 .5 6 6 0 0 1-4-1.6 6 6 0 0 1-4 1.6 5.9 5.9 0 0 1-2-.5Z" />
    </svg>
  );
}
function FactoryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M3 21V10l6 4V9l6 4V8l6 4v9H3Zm3-2h2v-2H6v2Zm4 0h2v-2h-2v2Zm4 0h2v-2h-2v2Z" />
    </svg>
  );
}

/** Card item type (public) */
export type AudienceItem = {
    title: string;
    text: string;
    color?: string;
    Icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

type AudienceProps = {
    /** Section title (default: "Para quem é?") */
    title?: string;
    /** Optional descriptive text under the title */
    description?: string;
    /** Audience cards; if omitted, a default trio is used */
    items?: AudienceItem[];
    /** Optional id for deep-linking, e.g. "#audience" */
    id?: string;
    /** Extra classes for the outer section (spacing/layout handled by the page) */
    className?: string;
    /**
     * Optional callback fired per card click.
     * Useful if the page wants to track analytics (e.g. GA4).
     */
    onCardClick?(title: string): void;
};

const DEFAULT_ITEMS: AudienceItem[] = [
    {
      title: 'Contadores',
      text: 'Conferência e conciliação. Deduplicação automática e revisão de CFOP/NCM/CST. CSV/XLSX prontos.',
      color: 'red',
      Icon: BriefcaseIcon,
    },
    {
      title: 'PMEs / MEIs',
      text: 'Baixe os XMLs do portal e gere planilhas organizadas sem complicação. Sem cadastro obrigatório no Beta.',
      color: 'blue',
      Icon: StoreIcon,
    },
    {
      title: 'Indústria / Comércio',
      text: 'Entrada e saída, canceladas marcadas, totais por NCM/CFOP — tudo separado por abas para análise rápida.',
      color: 'emerald',
      Icon: FactoryIcon,
    },
];

type Tone = 'red' | 'blue' | 'indigo' | 'emerald';
function colorClasses(tone: Tone = 'indigo') {
  switch (tone) {
    case 'red':     return 'bg-red-100 text-red-700';
    case 'blue':    return 'bg-blue-100 text-blue-700';
    case 'emerald': return 'bg-emerald-100 text-emerald-700';
    case 'indigo':
    default:        return 'bg-indigo-100 text-indigo-700';
  }
}

/** Reusable "Para quem é?" section */
export default function Audience({
    title = 'Para quem é?',
    description = 'Feito para quem precisa transformar XMLs em planilhas confiáveis no dia a dia.',
    items = DEFAULT_ITEMS,
    id = 'audience',
    className = '',
    onCardClick,
}: AudienceProps) {
    return(
        <section id={id} aria-labelledby={`${id}-heading`} className={className}>
            <h2
              id={`${id}-heading`}
              className="text-3xl font-bold text-center mb-2"
              style={{ color: 'var(--brand-navy)' }}
            >
                {title}
            </h2>

            {description ? (
                <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                    {description}
                </p>
            ) : null}

            <div className="grid md:grid-cols-3 gap-5">
                {items.map(({ title, text, color, Icon = BriefcaseIcon}) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => onCardClick?.(title)}
                      className="text-left rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClasses(color as Tone)}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="text-sm text-muted-foreground">{text}</p>
                    </button>
                ))}
            </div>
        </section>
    );
}

     