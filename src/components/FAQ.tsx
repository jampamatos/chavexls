import * as React from 'react';

/** Public type in case we want to pass custom items from a page */
export type FAQItem = {
  q: string;
  a: React.ReactNode;
};

type FAQProps = {
  /** A | B: controls the pricing answer */
  variant?: 'A' | 'B';
  /** Section title */
  title?: string;
  /** Optional description under the title */
  description?: string;
  /** Custom items; if provided, overrides defaults */
  items?: FAQItem[];
  /** Optional id for deep-linking */
  id?: string;
  /** Extra classes for outer section */
  className?: string;
  /** Analytics hook */
  onToggle?(question: string, isOpen: boolean): void;
}

/* Tiny inline chevron (no deps) */
function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 15.5 5.5 9 7 7.5l5 5 5-5L18.5 9z" />
    </svg>
  );
}

/** Base (common items for both variants) — LGPD, limits and operation */
const BASE_ITEMS: FAQItem[] = [
  {
    q: 'Quais XML vocês aceitam?',
    a: (
      <>
        Trabalhamos com os modelos <strong>55</strong> (NF-e) e <strong>65</strong> (NFC-e).
        Você pode juntar todos os arquivos em um <code>.zip</code> e enviar. Simples assim!
      </>
    ),
  },
  {
    q: 'O que vem na planilha?',
    a: (
      <>
        Você recebe um <strong>XLSX multiabas</strong> com <em>Notas</em>, <em>Itens</em>, <em>Emitentes</em>, <em>Destinatários</em> e <em>Totais</em>,
        além de uma visão por <em>NCM/CFOP</em>. As colunas já chegam <strong>tipadas</strong> (CFOP, NCM, CST, PIS/COFINS) e
        marcamos notas <em>canceladas</em> e <em>denegadas</em>.
      </>
    ),
  },
  {
    q: 'Há limites durante o Beta?',
    a: (
      <>
        Sim. Para garantir estabilidade, trabalhamos com fila e limites de volume.
        Se o seu <code>.zip</code> for muito grande, vale dividir em partes. Convites e acessos prioritários serão enviados por e-mail.
      </>
    ),
  },
  {
    q: 'Como funciona o “Apagar agora”?',
    a: (
      <>
        É um atalho da LGPD: você pode solicitar a <strong>exclusão imediata</strong> dos arquivos usados no processamento.
        Assim que acionado, removemos os dados do armazenamento ativo.
      </>
    ),
  },
  {
    q: 'Por quanto tempo meus dados ficam guardados? E os logs?',
    a: (
      <>
        Os arquivos expiram automaticamente em <strong>48h</strong>. Nossos logs técnicos não guardam dados fiscais sensíveis, apenas metadados
        mínimos para auditoria e estabilidade do serviço.
      </>
    ),
  },
  {
    q: 'E os cookies/consentimento?',
    a: (
      <>
        O armazenamento de dados métricos só acontece <strong>depois da sua aceitação</strong>. Sem consentimento, não disparamos eventos.
        Cookies de marketing permanecem desativados por padrão.
      </>
    ),
  },
  {
    q: 'Meu upload deu erro. E agora?',
    a: (
      <ul className="list-disc pl-5">
        <li>Verifique se o ZIP está sem XML ou com subpastas profundas, e coloque os <code>.xml</code> na raiz do <code>.zip</code>.</li>
        <li>Verifique se os arquivos estão fora do padrão: aceitamos NF-e/NFC-e válidos (55/65).</li>
        <li>Verifique arquivos com nomes estranhos. Renomear usando caracteres simples costuma resolver.</li>
      </ul>
    ),
  },
  {
    q: 'Como vocês cuidam da segurança?',
    a: (
      <>
        Todo o tráfego é feito via <strong>HTTPS/TLS</strong>, o que garante a segurança dos dados em trânsito. O armazenamento temporário 
        tem acesso restrito e políticas de segurança publicadas em cabeçalhos. Não retemos dados além do necessário para operar o Beta.
      </>
    ),
  },
  {
    q: 'Preciso falar com alguém — como faço?',
    a: (
      <>
        Durante o Beta, responda o e-mail do convite ou a mensagem que você recebe após o formulário.
        Assim conseguimos localizar seu caso rapidamente.
      </>
    ),
  },
];

export default function FAQ({
  variant = 'A',
  title = 'Perguntas Frequentes',
  description = 'Tudo o que você precisa saber sobre LGPD, limites do Beta e o que vem na planilha.',
  items,
  id = 'faq',
  className = '',
  onToggle,
}: FAQProps) {
  // Pricing item varies by variant
  const priceItem: FAQItem =
    variant === 'B'
      ? {
          q: 'Quanto vai custar após o Beta?',
          a: <>
            Planos previstos: <strong>Starter R$ 19,90/mês</strong> e <strong>Business R$ 59,90/mês</strong>.
            Durante o Beta não há cobrança.
          </>,
        }
      : {
          q: 'Quanto vai custar após o Beta?',
          a: (
            <>
              Planos previstos: <strong>Starter R$ 19,90/mês</strong> e <strong>Business R$ 59,90/mês</strong>.
              Quem participa do Beta recebe um <strong>voucher de −30% por 12 meses</strong> (enviado por e-mail, com condições e validade).
            </>
          ),
        };

  const resolvedItems = items ?? [...BASE_ITEMS, priceItem];

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      <h2
        id={`${id}-heading`}
        className="text-3xl font-bold text-center mb-3"
        style={{ color: 'var(--brand-navy)' }}
      >
        {title}
      </h2>

      {description ? (
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">{description}</p>
      ) : null}

      {/* Single column for comfortable reading */}
      <div className="mx-auto max-w-3xl space-y-3">
        {resolvedItems.map(({ q, a }, idx) => {
          const detailsId = `${id}-item-${idx}`;
          return (
            <details
              key={detailsId}
              className="group rounded-xl border bg-white p-4 transition-shadow duration-200 hover:shadow-sm group-open:shadow-md"
              onToggle={(e) => onToggle?.(q, (e.currentTarget as HTMLDetailsElement).open)}
            >
              <summary className="flex items-start justify-between gap-3 font-medium cursor-pointer select-none">
                <span>{q}</span>
                <ChevronIcon className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="
                mt-2 text-sm text-muted-foreground leading-relaxed opacity-0 -translate-y-1 transition-all duration-300 ease-out 
                group-open:opacity-100 group-open:translate-y-0"
              >{a}</div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
