import { useEffect, useState } from "react";
import { trackEvent } from "../lib/analytics";

import Audience from "../components/Audience";
import Benefits from "../components/Benefits";
import BetaSignupForm from "../components/BetaSignupForm";
import DemoPlayground from "../components/DemoPlayground";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import SecurityLGPD from "../components/SecurityLGPD";
import XlsxPreview from "../components/XlsxPreview";

/** Marketing landing page variant B */
export default function VariantB() {
    const [selectedPlan, setSelectedPlan] = useState<"starter" | "business" | "">("");

    useEffect(() => {
        // Variant B's demo_view also fires when the playground enters viewport (in the component)
        trackEvent('page_view', { variant: 'B' });
    }, []);

    function scrollTo(id: string) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Send dedicated event for demo generation CTA and reveal playground
    function handleDemoGenerateClick() {
        trackEvent('demo_generate_click', { variant: 'B' });
        scrollTo('demo');
    }

    function handleBetaClick() {
        trackEvent('form_start', { variant: 'B' });
        scrollTo('beta-signup');
    }

    function handlePlanClick(planId: 'starter' | 'business') {
        trackEvent('pricing_interest_click', { variant: 'B', plan_id: planId, plan_variant: 'regular' });

        const url = new URL(window.location.href);
        url.searchParams.set('plan_hint', planId);
        window.history.replaceState({}, '', url.toString());

        setSelectedPlan(planId);
        scrollTo('beta-signup');
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
          highlightTone: 'emerald' as const,
        },
    ];

    return (
            <main className="font-sans">
                {/* HERO */}
                <Hero
                  overline="ChaveXLS"
                  title="Planilha fiscal confiável a partir do seu XML"
                  subtitle={<>Tipagem correta. Totais por NCM/CFOP. LGPD: 'apagar agora' + expiração em 48h. <strong>Teste a amostra agora.</strong></>}
                  primary={{ label: 'Entrar no Beta', onClick: handleBetaClick }}
                  secondary={{ label: 'Gerar XLSX de exemplo', onClick: handleDemoGenerateClick }}
                  helperText="Convites do Beta enviados por e-mail."
                  chips={[
                    { label: 'Sem cartão de crédito no Beta.', tone: 'emerald' },
                    { label: 'Deduplicação por chave', tone: 'blue' },
                    { label: 'LGPD: “apagar agora” + 48h', tone: 'amber' },
                  ]}
                  sampleLink={{
                    href: '/assets/sample.xlsx',
                    onClick: () => trackEvent('sample_download', { variant: 'B' }),
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
                <XlsxPreview variant="B"/>

                {/* DEMO PLAYGROUND */}
                <DemoPlayground className="max-w-6xl mx-auto px-4 py-12" />
    
                {/* PLANS */}
                <Pricing
                  className="max-w-6xl mx-auto px-4 py-12"
                  plans={plans}
                  planVariant="regular"
                  founderDiscountPct={0.30}
                  footnote="Sem cobrança durante o Beta. Valores estimados; podem ajustar após o Beta."
                  onSelect={(planId) => handlePlanClick(planId)}
                />
    
                {/* SECURITY AND LGPD */}
                <div className="bg-accent/40">
                  <SecurityLGPD className="max-w-6xl mx-auto px-4 py-12" />
                </div>
                
    
                {/* FAQ */}
                <FAQ className="max-w-6xl mx-auto px-4 py-12" variant="B" />
    
                {/* SIGNUP SECTION */}
                <section id="beta-signup" className="max-w-6xl mx-auto px-4 py-10" aria-labelledby="signup-heading">
                  <span id="beta" />
                  <h2 id="signup-heading" className="text-xl font-semibold mb-3" style={{ color: 'var(--brand-navy)' }}>
                    Entrar no Beta
                  </h2>
                  <BetaSignupForm variant="B" selectedPlan={selectedPlan} />
                </section>
    
                {/* FOOTER */}
                <Footer variant="B" showDividerTop className="" />
            </main>
        );
}