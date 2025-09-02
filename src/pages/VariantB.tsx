import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
import { Link } from 'react-router-dom';
import XlsxPreview from '../components/XlsxPreview';
import BetaSignupForm from '../components/BetaSignupForm';

export default function VariantB() {
    useEffect(() => { trackEvent("demo_view", { variant: "B" }) }, [])

    return(
        <main className="font-sans">
            <section className="max-w-6xl mx-auto px-4 py-12 text-center">
                <h1 className="text-4xl font-bold mb-3" style={{ color: "var(--brand-navy)" }}>ChaveXLS</h1>
                <p className="text-lg text-muted-foreground">Conversor de XML de NF-e para planilha fiscal pronta (XLSX/CSV) em minutos</p>

                <div className="bg-accent rounded-xl p-4 mt-6 inline-block">
                <p className="font-medium">1º lote gratuito (50 XML) via link mágico com fila lenta</p>
                <button
                    className="mt-2 underline"
                    onClick={() => trackEvent("free_claim_click", { variant: "B" })}
                >
                    Quero meu primeiro lote gratuito
                </button>
                </div>

                <div className="mt-4">
                <button
                    className="underline"
                    onClick={() => trackEvent("pricing_interest_click", { variant: "B" })}
                >
                    Reserve o preço especial de lançamento
                </button>
                </div>
            </section>

            <XlsxPreview />

            <section className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-xl font-semibold mb-3">Entrar no Beta</h2>
                <BetaSignupForm variant="B" />
                <p className="mt-4 text-sm text-muted-foreground">
                <Link to="/terms" className="underline">Termos do Beta</Link> · Retenção de 48h · Autoatendimento de baixo contato
                </p>
            </section>
        </main>
    )
}