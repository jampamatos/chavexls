import { useEffect, useRef } from 'react';
import { trackEvent } from '../lib/analytics';

type Props = { className?: string };

/** Demo playground placeholder for Variant B */
export default function DemoPlayground({ className = ''}: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const firedRef = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting && !firedRef.current) {
                        firedRef.current = true;
                        trackEvent('demo_view', { variant: 'B' });
                    }
                });
            },
            { threshold: 0.5 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section id="demo" ref={ref} className={className} aria-labelledby="demo-heading">
            <h2 id="demo-heading" className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--brand-navy' }}>
                Demo offline (sem enviar arquivos)
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                Gere um XLSX de exemplo localmente, em ~3s. Não enviamos seus dados.<br />
                Área de sandbox para enviar 1 ZIP e baixar o XLSX pronto <strong>será implementada em breve</strong>.
            </p>

            <div className="rounded-2xl border bg-white p-6 shadow-sm max-w-3xl mx-auto">
                <div className="rounded-xl border-2 border-dashed p-10 text-center">
                    <p className="font-medium mb-1">Arraste aqui o ZIP (55/65)</p>
                    <p className="text-sm text-red-600"><strong>Placeholder — upload real será conectado depois.</strong></p>
                    <button
                      type="button"
                      disabled
                      className="mt-4 inline-flex item-center justify-center rounded-xl px-4 py-2 font-medium border bg-muted-foreground cursor-not-allowed"
                    >
                        Enviar ZIP
                    </button>
                </div>
            </div>
        </section>
    );
}