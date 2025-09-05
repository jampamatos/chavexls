import * as React from 'react';

/** Public type in case we want to pass custom items from a page */
export type FAQItem = {
  q: string;
  a: React.ReactNode;
};

type FAQProps = {
  /** A | B: controla o texto do item de preço */
  variant?: 'A' | 'B';
  /** Section title (default: "Perguntas Frequentes") */
  title?: string;
  /** Optional descriptive text under the title */
  description?: string;
  /** List of Q&As; if provided, overrides the defaults */
  items?: FAQItem[];
  /** Optional id for deep-linking, e.g. "#faq" */
  id?: string;
  /** Extra classes for the outer section (spacing/layout handled by the page) */
  className?: string;
  /**
   * Optional callback fired when a question is toggled.
   * Useful if the page wants to track analytics (e.g. GA4).
   */
  onToggle?(question: string, isOpen: boolean): void;
};

/** Base (itens comuns nas duas variantes) */
const BASE_ITEMS: FAQItem[] = [
  { q: 'Quais XMLs são suportados?', a: 'Modelos 55 e 65 (NF-e/NFC-e). Envie em um .zip.' },
  { q: 'Há limites no Beta?', a: 'Sim, limites de volume e fila. Convites por e-mail.' },
  { q: 'Quais abas existem no XLSX?', a: 'Notas, Itens, Emitentes, Destinatários, Totais, Totais_NCM_CFOP.' },
  { q: 'Como funciona “Apagar agora”?', a: 'Você pode solicitar exclusão imediata dos seus arquivos do processamento.' },
  { q: 'Qual a retenção e o que fica em logs?', a: 'Arquivos expiram em 48h. Logs não guardam dados fiscais sensíveis.' },
];

export default function FAQ({
  variant = 'A',
  title = 'Perguntas Frequentes',
  description,
  items,
  id = 'faq',
  className = '',
  onToggle,
}: FAQProps) {
  // constrói o item de preço conforme a variante
  const priceItem: FAQItem =
    variant === 'B'
      ? {
          q: 'Quanto vai custar após o Beta?',
          a: 'Starter R$ 19,90/mês e Business R$ 59,90/mês. Sem cobrança durante o Beta.',
        }
      : {
          q: 'Quanto vai custar após o Beta?',
          a: 'Starter R$ 19,90/mês e Business R$ 59,90/mês. Testers têm -30% por 12 meses.',
        };

  const resolvedItems = items ?? [...BASE_ITEMS, priceItem];

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      <h2
        id={`${id}-heading`}
        className="text-3xl font-bold text-center mb-4"
        style={{ color: 'var(--brand-navy)' }}
      >
        {title}
      </h2>

      {description ? (
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">{description}</p>
      ) : null}

      <div className="grid md:grid-cols-2 gap-4">
        {resolvedItems.map(({ q, a }, idx) => {
          const detailsId = `${id}-item-${idx}`;
          return (
            <details
              key={detailsId}
              className="rounded-xl border bg-white p-4"
              onToggle={(e) => onToggle?.(q, (e.currentTarget as HTMLDetailsElement).open)}
            >
              <summary className="font-medium cursor-pointer">{q}</summary>
              <div className="mt-2 text-sm text-muted-foreground">{a}</div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
