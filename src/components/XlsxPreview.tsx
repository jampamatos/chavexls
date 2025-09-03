export default function XlsxPreview() {
    return (
        <section className="max-w-6xl mx-auto my-10 px-4" aria-labelledby="preview-heading">
            <h2 id="preview-heading" className="text-2xl font-semibold mb-2">Como vai ficar</h2>
            <p className="mb-4 text-muted-foreground"> Exemplo de planilha fiscal pronta (preview de exemplo real).</p>

            <div className="grid md:grid-cols-2 gap-4">
                <img 
                  src="/assets/xlsx_preview_1.png" 
                  srcSet="/assets/xlsx_preview_1.png 1x, /assets/xlsx_preview_1@2x.png 2x"
                  sizes="(max-width: 768px) 100vw, 48vw"
                  alt="Preview da planilha: cabeçalho e lançamentos"
                  style={{ aspectRatio: '16/10' }}
                  loading="lazy" 
                  decoding="async"
                  className="rounded-xl border bg-gray-50 w-full h-auto" />
                <img 
                  src="/assets/xlsx_preview_2.png"
                  srcSet="/assets/xlsx_preview_2.png 1x, /assets/xlsx_preview_2@2x.png 2x"
                  sizes="(max-width: 768px) 100vw, 48vw"
                  alt="Preview da planilha: cálculos e totais"
                  style={{ aspectRatio: '16/10' }}
                  loading="lazy" 
                  decoding="async"
                  className="rounded-xl border bg-gray-50 w-full h-auto" />
            </div>
        </section>
    )
}