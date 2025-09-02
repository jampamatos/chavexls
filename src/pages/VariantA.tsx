import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
import { Link } from 'react-router-dom';
import XlsxPreview from '../components/XlsxPreview';
import BetaSignupForm from '../components/BetaSignupForm';

export default function VariantA() {
    useEffect(() => { trackEvent("demo_view", { variant: "A" }) }, [])

    return (
        <main className="font-sans">
            <section className="max-w-6xl mx-auto px-4 py-12 text-center">
                <h1 className="text-4xl font-bold mb-3" style={{ color: "var(--brand-navy)" }}>ChaveXLS</h1>
                <p className="text-lg text-muted-foreground">Conversor de XML de NF-e para planilha fiscal pronta (XLSX/CSV) em minutos</p>
                <div className="mt-6">
                    <button
                      className="underline"
                      onClick={() => trackEvent("pricing_interest_click", { variant: "A"})}
                    >
                        Reserve o preço especial de lançamento
                    </button>
                </div>
            </section>

            <XlsxPreview />

            <section className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-xl font-semibold mb-3">Entrar no Beta</h2>
                <BetaSignupForm variant="A" />
                <p className="mt-4 text-sm text-muted-foreground">
                    <Link to="/terms" className="underline">Termos do Beta</Link> · Retenção de 48h · Autoatendimento de baixo contato
                </p>
            </section>
        </main>
    )
}