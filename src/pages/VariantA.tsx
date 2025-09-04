import { useEffect, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { Link } from 'react-router-dom';

import Audience from '../components/Audience';
import Benefits from '../components/Benefits';
import BetaSignupForm from '../components/BetaSignupForm';
import FAQ from '../components/FAQ';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import SecurityLGPD from '../components/SecurityLGPD';
import XlsxPreview from '../components/XlsxPreview';

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

    function handlePlanClick(
      planId: 'starter' | 'business' | 'founder',
      planVariant?: 'founder' | 'regular'
    ) {
      trackEvent('pricing_interest_click', {
        variant: 'A',
        plan_id: planId,
        // sends 'founder' when coming from the pricing section of this variant
        plan_variant: planVariant ?? (planId === 'founder' ? 'founder' : undefined),
      });
    
      const url = new URL(window.location.href);
      url.searchParams.set('plan_hint', planId);
      window.history.replaceState({}, '', url.toString());
    
      if (planId === 'starter' || planId === 'business') {
        setSelectedPlan(planId);
      }
    
      const el = document.getElementById('beta-signup');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const plans = [
      {
        id: 'starter' as const,
        name: 'Até 100 XML',
        limit: 'Ideal para pequenas empresas',
        priceMonthly: 19.90,
        bullets: ['Conversão XLSX/CSV', 'Tipagem fiscal correta', 'Deduplicação automática'],
      },
      {
        id: 'business' as const,
        name: 'Até 1.000 XML',
        limit: 'Para empresas com maior volume',
        priceMonthly: 59.90,
        bullets: [
          'Conversão XLSX/CSV',
          'Tipagem fiscal correta',
          'Deduplicação automática',
          'Processamento prioritário',
          'Suporte técnico',
        ],
        badge: 'Mais Popular',
        highlightTone: "emerald" as "emerald", // gives the “ring”/bluish edge of the highlight
      },
    ];


    return (
        <main className="font-sans">
            {/* HERO */}
            <Hero
              overline="ChaveXLS"
              title="Transforme XML de NF-e em planilha fiscal em segundos."
              subtitle={<>Envie um ZIP e receba um XLSX multiabas pronto para conferência<br />(CFOP, NCM, CST, PIS/COFINS).</>}
              primary={{ label: 'Entrar no Beta', onClick: handleBetaClick }}
              secondary={{ label: 'Reservar preço fundador (-30% / 12 meses)', onClick: () => handlePlanClick('founder', 'founder') }}
              helperText="Sem cartão de crédito. Convites do Beta enviados por e-mail."
              chips={[
                { label: 'Sem cartão de crédito no Beta.', tone: 'emerald' },
                { label: 'Deduplicação por chave', tone: 'blue' },
                { label: 'LGPD: “apagar agora” + 48h', tone: 'amber' },
              ]}
              sampleLink={{
                href: '/assets/sample.xlsx',
                onClick: () => trackEvent('sample_download', { variant: 'A' }),
              }}
              className="max-w-6xl mx-auto px-4 py-14"
            />

            {/* HOW IT WORKS */}
            <div className="bg-muted/60">
                <HowItWorks className="max-w-6xl mx-auto px-4 py-12" />
            </div>

            {/* WHO IS IT FOR */}
            <Audience className="max-w-6xl mx-auto px-4 py-12" />

            {/* BENEFITS */}
            <div className="bg-muted/60">
              <Benefits className="max-w-6xl mx-auto px-4 py-12" />
            </div>

            {/* DEMO PREVIEW */}
            <XlsxPreview variant="A"/>

            {/* PLANS */}
            <Pricing
              className="max-w-6xl mx-auto px-4 py-12"
              plans={plans}
              planVariant="founder"              // mostra preço riscado + fundador (−30%)
              founderDiscountPct={0.30}
              footnote="Sem cobrança durante o Beta. Valores estimados; podem ajustar após o Beta."
              onSelect={(planId) => handlePlanClick(planId, 'founder')}
            />

            {/* SECURITY AND LGPD */}
            <div className="bg-accent/40">
              <SecurityLGPD className="max-w-6xl mx-auto px-4 py-12" />
            </div>
            

            {/* FAQ */}
            <FAQ className="max-w-6xl mx-auto px-4 py-12" />

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