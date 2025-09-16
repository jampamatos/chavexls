import { track } from '../lib/analytics';

type Props = { variant: 'A' | 'B' };

export default function XlsxPreview({ variant }: Props) {
  return (
    <section className="max-w-6xl mx-auto my-10 px-4" aria-labelledby="xlsx-preview-heading">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <h2 id="xlsx-preview-heading" className="text-2xl font-semibold">Como vai ficar</h2>
          <p className="text-muted-foreground">
            Exemplo de planilha fiscal pronta (preview de exemplo real).
          </p>
        </div>

        {/* XLSX Sample Link - for Variant B only */}
        {variant === 'B' && (
          <a
            href="assets/sample.xlsx"
            download
            onClick={() => track('sample_download', { variant })}
            className="shrink-0 inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium border border-[var(--brand-navy)] text-[var(--brand-navy)] hover:bg-[var(--brand-navy)]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Ver amostra de XLSX
          </a>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <img
          src="/assets/xlsx_preview_1.png"
          srcSet="/assets/xlsx_preview_1.png 1x, /assets/xlsx_preview_1@2x.png 2x"
          sizes="(max-width: 768px) 100vw, 48vw"
          alt="Preview da planilha: cabeçalho e lançamentos"
          width={1280} height={800} // preserve aspect ratio to kill CLS
          loading="lazy"
          className="rounded-xl border bg-white"
        />
        <img
          src="/assets/xlsx_preview_2.png"
          srcSet="/assets/xlsx_preview_2.png 1x, /assets/xlsx_preview_2@2x.png 2x"
          sizes="(max-width: 768px) 100vw, 48vw"
          alt="Preview da planilha: cálculos e totais"
          width={1280} height={800}
          loading="lazy"
          className="rounded-xl border bg-white"
        />
      </div>
    </section>
  );
}
