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

/* Tiny inline chevron (no deps) */
function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 15.5 5.5 9 7 7.5l5 5 5-5L18.5 9z" />
    </svg>
  );
}

/** Base (itens comuns nas duas variantes) — LGPD, limites e operação */
const BASE_ITEMS: FAQItem[] = [
  {
    q: 'Quais XMLs são suportados?',
    a: <>Modelos <strong>55</strong> (NF-e) e <strong>65</strong> (NFC-e). Envie em um arquivo <code>.zip</code> com os XML.</>,
  },
  {
    q: 'O que vem no XLSX?',
    a: (
      <>
        Abas: <em>Notas</em>, <em>Itens</em>, <em>Emitentes</em>, <em>Destinatários</em>, <em>Totais</em> e <em>Totais_NCM_CFOP</em>.
        Colunas já tipadas (CFOP, NCM, CST, PIS/COFINS) e marcação de canceladas/denegadas.
      </>
    ),
  },
  {
    q: 'Há limites no Beta?',
    a: (
      <>
        Sim, temos limites de volume e fila durante o Beta. Se seu ZIP for muito grande, recomendamos dividir em partes.
        Convites e prioridades são enviados por e-mail.
      </>
    ),
  },
  {
    q: 'Como funciona “Apagar agora”?',
    a: (
      <>
        Você pode solicitar <strong>exclusão imediata</strong> dos arquivos do processamento. Isso remove os dados do armazenamento ativo.
      </>
    ),
  },
  {
    q: 'Qual a retenção e o que fica em logs?',
    a: (
      <>
        Arquivos expiram em <strong>48h</strong>. Logs técnicos não guardam dados fiscais sensíveis (usamos apenas metadados mínimos
        para auditoria e estabilidade do serviço).
      </>
    ),
  },
  {
    q: 'Cookies e consentimento',
    a: (
      <>
        Medição (GA4) só é ativada <strong>após seu consentimento</strong>. Sem opt-in, não enviamos eventos. Cookies de marketing
        permanecem desativados por padrão.
      </>
    ),
  },
  {
    q: 'Erros comuns no upload (como resolver)?',
    a: (
      <ul className="list-disc pl-5">
        <li>ZIP sem XML ou com subpastas profundas → coloque apenas os <code>.xml</code> na raiz do ZIP.</li>
        <li>Arquivos corrompidos/especiais → garanta que são NF-e/NFC-e válidos (55/65).</li>
        <li>Nomes com caracteres incomuns → renomeie se necessário (ASCII simples ajuda).</li>
      </ul>
    ),
  },
  {
    q: 'Segurança dos dados',
    a: (
      <>
        Tráfego sob <strong>HTTPS/TLS</strong>, armazenamento temporário com acesso restrito e políticas de segurança publicadas
        nos nossos headers. Não retemos dados além do necessário para operação do Beta.
      </>
    ),
  },
  {
    q: 'Como falo com suporte?',
    a: (
      <>
        Durante o Beta, responda o e-mail do convite ou a mensagem de retorno que você receber após envio do formulário. Assim
        conseguimos rastrear seu caso mais rápido.
      </>
    ),
  },
];

export default function FAQ({
  variant = 'A',
  title = 'Perguntas Frequentes',
  description = 'LGPD em primeiro lugar, limites do Beta claros e planilha fiscal pronta para conferência.',
  items,
  id = 'faq',
  className = '',
  onToggle,
}: FAQProps) {
  // item de preço conforme a variante (A tem desconto; B não menciona desconto)
  const priceItem: FAQItem =
    variant === 'B'
      ? {
          q: 'Quanto vai custar após o Beta?',
          a: <>Planos previstos: <strong>Starter R$ 19,90/mês</strong> e <strong>Business R$ 59,90/mês</strong>. Sem cobrança durante o Beta.</>,
        }
      : {
          q: 'Quanto vai custar após o Beta?',
          a: (
            <>
              Planos previstos: <strong>Starter R$ 19,90/mês</strong> e <strong>Business R$ 59,90/mês</strong>.
              Quem testar no Beta tem <strong>-30% por 12 meses</strong> (voucher enviado por e-mail; condições e validade informadas no voucher).
            </>
          ),
        };

  // ordem final: conteúdo base + preço (padrão) ou itens customizados via props
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
              className="group rounded-xl border bg-white p-4"
              onToggle={(e) => onToggle?.(q, (e.currentTarget as HTMLDetailsElement).open)}
            >
              <summary className="flex items-start justify-between gap-3 font-medium cursor-pointer">
                <span>{q}</span>
                <ChevronIcon className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2 text-sm text-muted-foreground">{a}</div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
