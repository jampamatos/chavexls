export default function XlsxPreview() {
    return (
        <section className="max-w-6xl mx-auto my-10 px-4">
            <h2 className="text-2xl font-semibold mb-3">Como vai ficar</h2>
            <p className="mb-3 text-muted-foreground"> Exemplo de planilha fiscal pronta (preview de exemplo real).</p>

            <div className="grid md:grid-cols-2 gap-4">
                <img src="/assets/xlsx_preview_1.png" alt="Preview da planilha: cabeçalho e lançamentos" loading="lazy" className="rounded-xl border" />
                <img src="/assets/xlsx_preview_2.png" alt="Preview da planilha: cálculos e totais" loading="lazy" className="rounded-xl border" />
            </div>
        </section>
    )
}