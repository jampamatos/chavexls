/** Privacy policy page */
export default function Privacy() {
  function goBack() {
        if(window.history.length > 1) window.history.back();
        else window.location.href = '/a'; // Fallback to main page
    }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
          >
            Voltar
          </button>
      </div>

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--brand-navy)' }}>
        Política de Privacidade — ChaveXLS
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Última atualização: {new Date().toLocaleDateString('pt-BR')}
      </p>

      <section className="space-y-4 leading-relaxed">
        <h2 className="text-xl font-semibold">Dados que tratamos</h2>
        <ul className="list-disc pl-6">
          <li>Dados de contato do formulário (nome, e-mail, perfil, volume).</li>
          <li>Conteúdo opcional de “Mensagem” para contato/feedback.</li>
          <li>Arquivos XML enviados para conversão (expiram em 48h).</li>
          <li>Métricas de uso (eventos anônimos de produto).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Finalidade</h2>
        <p>
          Operar o Beta, contatar usuários interessados, melhorar o produto e oferecer o preço de fundador.
        </p>

        <h2 className="text-xl font-semibold mt-6">Retenção & exclusão</h2>
        <p>
          Arquivos expiram em <strong>48h</strong>. Você pode solicitar exclusão imediata (“Apagar agora”) ou
          por e-mail: <a className="underline" href="mailto:contato@chavexls.com">contato@chavexls.com</a>.
        </p>

        <h2 className="text-xl font-semibold mt-6">Compartilhamento</h2>
        <p>
          Não vendemos dados. Podemos usar provedores (por exemplo, hospedagem e analytics) conforme necessário
          para operar o serviço.
        </p>

        <h2 className="text-xl font-semibold mt-6">Seus direitos</h2>
        <p>
          Você pode solicitar acesso, correção e exclusão de dados pessoais conforme a <strong>LGPD</strong>.
        </p>
      </section>
    </main>
  );
}
