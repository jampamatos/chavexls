export default function Terms() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--brand-navy)' }}>
                Termos do Beta para o ChaveXLS
            </h1>

            <p className="text-sm text-muted-foreground mb-6">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="space-y-4 leading-relaxed">
                <p>
                    O programa Beta do <strong>ChaveXLS</strong> oferece acesso antecipado para avaliar a conversão de
                    XMLs de NF-e em planilhas (XLSX/CSV). Ao participar, você concorda com os termos abaixo.
                </p>

                <h2 className="text-xl font-semibold mt-6">1. Sem SLA e com limites</h2>
                <p>
                    Durante o Beta, não há garantia de disponibilidade contínua. Podemos aplicar limites de volume,
                    tamanho de arquivo e fila de processamento.
                </p>

                <h2 className="text-xl font-semibold mt-6">2. Uso permitido</h2>
                <p>
                    Destina-se a testes e validação. É proibido uso para fins ilícitos ou que violem direitos de terceiros.
                </p>

                <h2 className="text-xl font-semibold mt-6">3. Preço de fundador</h2>
                <p>
                    Inscritos no Beta podem obter <strong>-30% por 12 meses</strong> após o lançamento comercial (sujeito à disponibilidade).
                    Os valores (R$ 19,90 e R$ 59,90) são estimados e podem ser ajustados no lançamento.
                </p>

                <h2 className="text-xl font-semibold mt-6">4. Segurança & retenção</h2>
                <p>
                    Seus arquivos expiram automaticamente em <strong>48h</strong>. Você pode solicitar exclusão imediata
                    via “Apagar agora”. Não guardamos informações fiscais permanentemente.
                </p>

                <h2 className="text-xl font-semibold mt-6">5. Contato</h2>
                <p>
                    Dúvidas? <a className="underline" href="mailto:contato@chavexls.com">contato@chavexls.com</a>.
                </p>
            </section>
        </main>
    )
}