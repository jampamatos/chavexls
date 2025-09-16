import { useEffect, useMemo, useRef, useState } from 'react';
import { track } from '../lib/analytics';
import { readStoredUtms } from '../lib/utm';

type Props = { className?: string };

/** Demo playground placeholder for Variant B */
export default function DemoPlayground({ className = ''}: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const firedRef = useRef(false);
    const [loading, setLoading] = useState(false);
    const utms = useMemo(() => readStoredUtms(), []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting && !firedRef.current) {
                        firedRef.current = true;
                        track('demo_view', { variant: 'B', ...utms });
                    }
                });
            },
            { threshold: 0.5 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [utms]);

    async function handleGenerate() {
        if (loading) return;
        setLoading(true);
        try {
            track('demo_generate_click', { variant: 'B', ...utms });
            // dynamic import keeps the main bundle light
            const mod = await import('../lib/xlsxSample');
            await mod.downloadSampleXlsxWithExcelJS();
            track('sample_download', { variant: 'B', ...utms });
        } catch {
            alert('Falha ao gerar a amostra. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="demo" ref={ref} className={className} aria-labelledby="demo-heading">
            <h2 id="demo-heading" className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--brand-navy' }}>
                Demo offline<br />
                <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 text-emerald-700 px-2 py-1 text-xs border border-emerald-100 align-middle mr-2">
                    ✓ sem enviar arquivos
                </span>
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                
                Gere um XLSX de exemplo localmente, em 3 segundos.
                Área de sandbox para enviar 1 ZIP e baixar o XLSX pronto <strong>será implementada em breve</strong>.
            </p>

            <div className="rounded-2xl border bg-white p-6 shadow-sm max-w-3xl mx-auto">
                {/* Offline sample generator */}
                <div className="rounded-xl p-6 border mb-6 text-center">
                    <p className="font-medium mb-2">Gerar planilha de exemplo (NF-e → XLSX)</p>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={loading}
                      aria-busy={loading}
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium border bg-primary text-primary-foreground disabled:opacity-60"
                    >
                        {loading ? 'Gerando...' : 'Gerar XLSX de exemplo'}
                    </button>
                    <p className="text-xs text-muted-foreground mt-2">O arquivo é gerado no seu navegador.</p>
                </div>

                <div className="rounded-xl border-2 border-dashed p-10 text-center">
                    <p className="font-medium mb-1">Arraste aqui o ZIP (55/65)</p>
                    <p className="text-sm text-red-600"><strong>Placeholder — upload real será conectado depois.</strong></p>
                    <button
                      type="button"
                      disabled
                      className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium border bg-muted-foreground cursor-not-allowed"
                    >
                        Enviar ZIP
                    </button>
                </div>
            </div>
        </section>
    );
}
