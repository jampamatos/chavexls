export default function Subprocessors() {
  // Back button behavior (same as Terms/Privacy)
  function goBack() {
    if (typeof window !== "undefined" && window.history.length > 1) window.history.back();
    else window.location.href = "/a"; // Fallback to landing
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Top Bar */}
      <div className="mb-6">
        <button
          type="button"
          onClick={goBack}
          aria-label="Voltar"
          className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
        >
          Voltar
        </button>
      </div>

      {/* Heading */}
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: "var(--brand-navy)" }}
      >
        Subprocessadores (LGPD)
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        <strong>Última atualização:</strong> 08/09/2025
      </p>

      {/* Intro */}
      <section className="leading-relaxed space-y-3 mb-6">
        <p>
          Esta página lista os provedores terceirizados que atuam como <strong>subprocessadores</strong> para o
          <strong> ChaveXLS</strong>, com suas finalidades, localização principal e links para políticas. Usamos esses
          serviços para operar o produto com segurança, desempenho e observabilidade.
        </p>
        <p className="text-sm text-muted-foreground">
          Transferências internacionais podem ocorrer (ex.: EUA/UE). Adotamos salvaguardas como{" "}
          cláusulas contratuais padrão, confidencialidade e criptografia em trânsito (HTTPS) e, quando aplicável,
          em repouso, conforme a LGPD. Mudanças relevantes nesta lista serão comunicadas por aviso no site.
        </p>
      </section>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-3 border-b">Provedor</th>
              <th className="text-left p-3 border-b">Finalidade</th>
              <th className="text-left p-3 border-b">Localização</th>
              <th className="text-left p-3 border-b">Tipos de dados</th>
              <th className="text-left p-3 border-b">Base legal</th>
              <th className="text-left p-3 border-b">Política</th>
            </tr>
          </thead>
          <tbody>
            {/* Hosting / CDN */}
            <tr className="align-top">
              <td className="p-3 border-b font-medium">Netlify</td>
              <td className="p-3 border-b">Hospedagem de site/app, build e deploy</td>
              <td className="p-3 border-b">EUA / rede global</td>
              <td className="p-3 border-b">Metadados técnicos (IP, headers, logs de acesso)</td>
              <td className="p-3 border-b">Legítimo interesse (segurança, entrega)</td>
              <td className="p-3 border-b">
                <a className="underline" href="https://www.netlify.com/privacy/">Privacy</a>
              </td>
            </tr>

            <tr className="align-top">
              <td className="p-3 border-b font-medium">Cloudflare</td>
              <td className="p-3 border-b">CDN, DNS, proteção DDoS, edge cache</td>
              <td className="p-3 border-b">Global (EUA/UE)</td>
              <td className="p-3 border-b">Metadados técnicos (IP, requisições, logs de firewall)</td>
              <td className="p-3 border-b">Legítimo interesse (segurança, performance)</td>
              <td className="p-3 border-b">
                <a className="underline" href="https://www.cloudflare.com/privacypolicy/">Privacy</a>
              </td>
            </tr>

            {/* Analytics */}
            <tr className="align-top">
              <td className="p-3 border-b font-medium">Google Analytics 4</td>
              <td className="p-3 border-b">Mensuração de uso, métricas agregadas, A/B tests</td>
              <td className="p-3 border-b">EUA / UE (data centers distribuídos)</td>
              <td className="p-3 border-b">Eventos de navegação, IP anon., user-agent, device</td>
              <td className="p-3 border-b">
                Legítimo interesse (analytics) ou Consentimento (banner), conforme configuração
              </td>
              <td className="p-3 border-b">
                <a className="underline" href="https://policies.google.com/privacy">Privacy</a>
              </td>
            </tr>

            {/* Email transacional */}
            <tr className="align-top">
              <td className="p-3 border-b font-medium">Resend (ou Postmark)</td>
              <td className="p-3 border-b">Envio de e-mails transacionais / convites</td>
              <td className="p-3 border-b">EUA</td>
              <td className="p-3 border-b">E-mail do destinatário, conteúdo da mensagem</td>
              <td className="p-3 border-b">Execução de contrato (comunicações operacionais)</td>
              <td className="p-3 border-b">
                <a className="underline" href="https://resend.com/privacy">Resend</a>
                <span className="mx-1">·</span>
                <a className="underline" href="https://postmarkapp.com/privacy">Postmark</a>
              </td>
            </tr>

            {/* Forms */}
            <tr className="align-top">
              <td className="p-3 border-b font-medium">Netlify Forms</td>
              <td className="p-3 border-b">Recebimento de formulários e leads</td>
              <td className="p-3 border-b">EUA</td>
              <td className="p-3 border-b">Nome (opcional), e-mail, mensagem enviada</td>
              <td className="p-3 border-b">Execução de contrato (suporte/contato)</td>
              <td className="p-3 border-b">
                
                <a className="underline" href="https://www.netlify.com/privacy/">Netlify</a>
              </td>
            </tr>

            {/* Monitoring / Errors */}
            <tr className="align-top">
              <td className="p-3 border-b font-medium">Sentry</td>
              <td className="p-3 border-b">Observabilidade, monitoramento de erros</td>
              <td className="p-3 border-b">EUA / UE</td>
              <td className="p-3 border-b">Metadados técnicos e stack traces (sem conteúdo fiscal)</td>
              <td className="p-3 border-b">Legítimo interesse (segurança, estabilidade)</td>
              <td className="p-3 border-b">
                <a className="underline" href="https://sentry.io/privacy/">Privacy</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <section className="mt-4 text-sm text-muted-foreground leading-relaxed">
        <p>
          <strong>Observações:</strong> não enviamos conteúdo fiscal dos Arquivos para ferramentas de analytics ou monitoramento.
          Logs e métricas usam <em>metadados mínimos</em> necessários para segurança e depuração. Para detalhes completos, consulte a{" "}
          <a className="underline" href="/privacy">Política de Privacidade</a>.
        </p>
      </section>
    </main>
  );
}
