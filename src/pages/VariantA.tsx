import { useEffect, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { Link } from 'react-router-dom';
import XlsxPreview from '../components/XlsxPreview';
import BetaSignupForm from '../components/BetaSignupForm';

/** Inline SVGs to avoid new deps (icons) */
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path fill="currentColor" d="M9.55 17.54 4.8 12.8l1.41-1.41 3.34 3.34 8.23-8.23 1.41 1.41z" />
        </svg>
    );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path fill="currentColor" d="M5 20h14v-2H5v2zm7-16-5 5h3v4h4v-4h3l-5-5z" />
        </svg>
    );
}

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path fill="currentColor" d="M20 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-1.11-.89-2-2-2Zm0 14H4V10h16v8ZM4 8V6h16v2H4Z" />
        </svg>
    );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path fill="currentColor" d="M5 20h14v-2H5v2Zm7-16v8.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V4h1Z" />
        </svg>
    );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.74 8 11 4.6-1.26 8-6 8-11V5l-8-3Zm0 18c-3.31-1.02-6-4.94-6-9.01V6.3l6-2.25 6 2.25v4.69C18 15.06 15.31 18 12 20Zm-1-5.59L8.91 13.3l-1.41 1.41L11 18.22l5.5-5.5-1.41-1.41L11 14.41Z" />
        </svg>
    );
}

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

export default function VariantA() {
    const [selectedPlan, setSelectedPlan] = useState<'starter' | 'business' | ''>('');

    // Fire a page-level demo view with variant tag
    useEffect(() => { 
        trackEvent("demo_view", { variant: "A" });
    }, []);

    // CTA Handlers
    function handleBetaClick() {
        trackEvent('form_start', { variant: 'A' });
        const el = document.getElementById('beta-signup');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function handlePlanClick(planId: 'starter' | 'business' | 'founder') {
        // Pricing click from "Planos" (sends plan_id) and sets plan_hint in URL for the form to read later
        trackEvent('pricing_interest_click', { variant: 'A', plan_id: planId });
        
        const url = new URL(window.location.href);
        url.searchParams.set('plan_hint', planId);
        window.history.replaceState({}, '', url.toString());

        if (planId === 'starter' || planId === 'business') {
          setSelectedPlan(planId);
        }

        const el = document.getElementById('beta-signup');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <main className="font-sans">
            {/* HERO */}
            <section
              aria-labelledby="hero-heading"
              className="
                relative overflow-hidden
                border-b
                bg-gradient-to-b from-blue-50/60 via-white to-white
                "
            >
                {/* Decorative blobs */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 w-[60rem] rounded-full blur-3xl"
                  style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(59,130,246,0.25), transparent 70%)' }}
                />
                <div className="max-w-6xl mx-auto px-4 py-14 text-center relative">
                    {/* Brand overline */}
                    <p className="tracking-wide text-sm font-semibold mb-2" style={{ color: 'var(--brand-navy)' }}>
                        ChaveXLS
                    </p>

                    {/* Variant A - speed-focused headline */}
                    <h1 id="hero-heading" className="text-4xl md:text-5xl font-extrabold mb-4" style= {{color: 'var(--brand-navy)'}}>
                        Transforme XML de NF-e em planilha fiscal em segundos.
                    </h1>

                    {/* Subcopy */}
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Envie um ZIP e receba um XLSX multiabas pronto para conferência<br />
                        (CFOP, NCM, CST, PIS/COFINS).
                    </p>

                    {/* CTAs */}
                    <div className="mt-7 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={handleBetaClick}
                            aria-describedby="hero-cta-desc"
                            className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium shadow-sm bg-[var(--brand-navy)] text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                            Entrar no Beta
                        </button>

                        <button
                            type="button"
                            onClick={ () => handlePlanClick('founder')}
                            aria-describedby="hero-cta-desc"
                            className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium border border-[var(--brand-navy)] text-[var(--brand-navy)] hover:bg-[var(--brand-navy)]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                            Reservar preço fundador (-30% / 12 meses)
                        </button>
                    </div>

                    <p id="hero-cta-desc" className="mt-3 text-sm text-muted-foreground">
                        Sem cartão de crédito. Convites do Beta enviados por e-mail.
                    </p>

                    {/* Trust Badges */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 border border-emerald-100">
                            <CheckIcon className="w-4 h-4" /> Sem cartão de crédito no Beta.
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 border border-blue-100">
                            <CheckIcon className="w-4 h-4" /> Deduplicação por chave
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 px-3 py-1 border border-amber-100">
                            <CheckIcon className="w-4 h-4" /> LGPD: “apagar agora” + 48h
                        </span>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <div className="bg-muted/60">
                <section aria-labelledby="hiw-heading" className="max-w-6xl mx-auto px-4 py-12">
                    <h2 id="hiw-heading" className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--brand-navy)' }}>
                        Como Funciona
                    </h2>
                    <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                        Conversão fiscal confiável em 3 passos simples. Multiabas tipadas e validações automáticas.
                    </p>

                    <div className="grid md:grid-cols-3 gap-5">
                     {[
                       { Icon: UploadIcon, title: '1. Upload', text: 'Arraste um .zip com seus XML (55/65) ou clique para selecionar.' },
                       { Icon: CreditCardIcon, title: '2. Processamos', text: 'Validações, tipagem fiscal e deduplicação automática por chave.' },
                       { Icon: DownloadIcon, title: '3. Baixar XLSX', text: 'Planilha pronta com validações, tipagem correta e dados organizados.' },
                     ].map(({ Icon, title, text }) => (
                       <div key={title} className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                         <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                           <Icon className="w-6 h-6" />
                         </div>
                         <h3 className="font-semibold mb-1">{title}</h3>
                         <p className="text-sm text-muted-foreground">{text}</p>
                       </div>
                     ))}
                   </div>
                </section>
            </div>

            {/* WHO IS IT FOR */}
            <section aria-labelledby="audience-heading" className="max-w-6xl mx-auto px-4 pb-12">
                <h2 id="audience-heading" className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--brand-navy)' }}>
                    Para quem é
                </h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                    Feito para quem precisa transformar XMLs em planilhas confiáveis no dia a dia.
                </p>

                <div className="grid md:grid-cols-3 gap-5">
                  <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center mb-3">
                      <BriefcaseIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-1">Contadores</h3>
                    <p className="text-sm text-muted-foreground">
                      Conferência e conciliação. Deduplicação automática e revisão de CFOP/NCM/CST. CSV/XLSX prontos.
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                      <StoreIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-1">PMEs / MEIs</h3>
                    <p className="text-sm text-muted-foreground">
                      Baixe os XMLs do portal e gere planilhas organizadas sem complicação. Planilhas prontas quase instantaneamente.
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                      <FactoryIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-1">Indústria / Comércio</h3>
                    <p className="text-sm text-muted-foreground">
                      Entrada e saída, canceladas marcadas, totais por NCM/CFOP — tudo separado por abas para análise rápida.
                    </p>
                  </div>
                </div>
            </section>

            {/* BENEFITS */}
            <div className="bg-muted/60">
              <section aria-labelledby="benefits-heading" className="max-w-6xl mx-auto px-4 py-12">
                <h2 id="benefits-heading" className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--brand-navy)' }}>
                  O que você recebe
                </h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                  Planilha fiscal completa, pronta para conferência e conciliação contábil.
                </p>
      
                <div className="grid md:grid-cols-3 gap-5">
                  <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center mb-3">
                      <LayersIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-1">Multiabas Organizadas</h3>
                    <p className="text-sm text-muted-foreground">Itens, totais, impostos e canceladas em abas separadas com tipagem correta.</p>
                  </div>
                  <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                      <DatabaseIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-1">CFOP/NCM/CST</h3>
                    <p className="text-sm text-muted-foreground">Códigos fiscais organizados e validados para análise tributária precisa.</p>
                  </div>
                  <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                      <CheckIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-1">Deduplicação</h3>
                    <p className="text-sm text-muted-foreground">Remoção automática de duplicatas por chave, garantindo dados únicos.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* DEMO PREVIEW */}
            <XlsxPreview />

            {/* PLANS */}
            <section aria-labelledby="pricing-heading" className="max-w-6xl mx-auto px-4 py-12">
              <h2 id="pricing-heading" className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--brand-navy)' }}>
                Planos
              </h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                Escolha o plano ideal para o volume da sua empresa. Sem cobrança durante o Beta.
              </p>
      
              <div className="grid md:grid-cols-2 gap-6">
                {/* Starter */}
                <div className="rounded-3xl border p-6 md:p-8 shadow-sm bg-white transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <h3 className="text-xl font-semibold">Até 100 XML</h3>
                  <p className="text-sm text-muted-foreground mb-4">Ideal para pequenas empresas</p>
                  <p className="text-3xl font-extrabold mb-4">R$ 19,90 <span className="text-base font-medium">/ mês</span></p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-600" /> Conversão XLSX/CSV</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-600" /> Tipagem fiscal correta</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-600" /> Deduplicação automática</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => handlePlanClick('starter')}
                    className="w-full inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium shadow-sm bg-[var(--brand-navy)] text-white hover:opacity-90"
                  >
                    Garantir preço fundador
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground">Pós-Beta; testers −30% por 12 meses.</p>
                </div>
      
                {/* Business */}
                <div className="rounded-3xl border p-6 md:p-8 shadow-sm bg-white relative transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs rounded-full px-3 py-1 bg-indigo-600 text-white shadow">
                    Mais Popular
                  </span>
                  <h3 className="text-xl font-semibold">Até 1.000 XML</h3>
                  <p className="text-sm text-muted-foreground mb-4">Para empresas com maior volume</p>
                  <p className="text-3xl font-extrabold mb-4">R$ 59,90 <span className="text-base font-medium">/ mês</span></p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-600" /> Conversão XLSX/CSV</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-600" /> Tipagem fiscal correta</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-600" /> Deduplicação automática</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-600" /> Processamento prioritário</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-600" /> Suporte técnico</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => handlePlanClick('business')}
                    className="w-full inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium shadow-sm bg-[var(--brand-navy)] text-white hover:opacity-90"
                  >
                    Garantir preço fundador
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground">Pós-Beta; testers −30% por 12 meses.</p>
                </div>
              </div>
      
              <p className="text-center text-xs text-muted-foreground mt-6">
                Sem cobrança durante o Beta. Valores estimados; podem ajustar após o Beta.
              </p>
            </section>

            {/* SECURITY AND LGPD */}
            <div className="bg-accent/40">
              <section aria-labelledby="lgpd-heading" className="max-w-6xl mx-auto px-4 py-12">
                <div className="rounded-3xl border bg-white p-8 md:p-10 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <ShieldIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 id="lgpd-heading" className="text-2xl font-bold mb-2" style={{ color: 'var(--brand-navy)' }}>
                        Segurança & LGPD
                      </h2>
                      <p className="text-muted-foreground">
                        Seus arquivos expiram automaticamente em <strong>48h</strong> e você pode <strong>“Apagar agora”</strong> a qualquer momento.
                        Tráfego criptografado (<strong>HTTPS</strong>). Não mantemos dados sensíveis em logs.
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">Conformidade total com a LGPD.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* FAQ */}
            <div className="bg-muted/60">
              <section aria-labelledby="faq-heading" className="max-w-6xl mx-auto px-4 py-12">
                <h2 id="faq-heading" className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--brand-navy)' }}>
                  Perguntas Frequentes
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    ['Quais XMLs são suportados?', 'Modelos 55 e 65 (NF-e/NFC-e). Envie em um .zip.'],
                    ['Há limites no Beta?', 'Sim, limites de volume e fila. Convites por e-mail.'],
                    ['Quais abas existem no XLSX?', 'Notas, Itens, Emitentes, Destinatários, Totais, Totais_NCM_CFOP.'],
                    ['Como funciona “Apagar agora”?', 'Você pode solicitar exclusão imediata dos seus arquivos do processamento.'],
                    ['Qual a retenção e o que fica em logs?', 'Arquivos expiram em 48h. Logs não guardam dados fiscais sensíveis.'],
                    ['Quanto vai custar após o Beta?', 'Starter R$ 19,90/mês e Business R$ 59,90/mês. Testers têm −30% por 12 meses.'],
                  ].map(([q, a]) => (
                    <details key={q} className="rounded-xl border bg-white p-4">
                      <summary className="font-medium cursor-pointer">{q}</summary>
                      <p className="mt-2 text-sm text-muted-foreground">{a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* SIGNUP SECTION */}
            <section id="beta-signup" className="max-w-6xl mx-auto px-4 py-10" aria-labelledby="signup-heading">
              <span id="beta" />
              <h2 id="signup-heading" className="text-xl font-semibold mb-3" style={{ color: 'var(--brand-navy)' }}>
                Entrar no Beta
              </h2>
              <BetaSignupForm variant="A" selectedPlan={selectedPlan} />
            </section>

            {/* FOOTER */}
            <footer className="py-10 text-center text-sm text-muted-foreground">
              <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <Link to="/termos-beta" className="underline">Termos</Link>
                  <Link to="/privacidade" className="underline">Privacidade</Link>
                  <a href="mailto:contato@chavexls.com" className="underline">Contato</a>
                </div>
                <p>© {new Date().getFullYear()} ChaveXLS.</p>
              </div>
            </footer>
        </main>
    );
}