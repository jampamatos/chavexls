export default function Privacy() {
  function goBack() {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "/a"; // Fallback para a landing
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
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
        Política de Privacidade (LGPD) — Versão base
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        <strong>Última atualização:</strong> 08/09/2025
      </p>

      {/* Identificação */}
      <section className="leading-relaxed space-y-2 mb-6">
        <p>
          <strong>Controladora:</strong> [RAZÃO SOCIAL] (“<strong>ChaveXLS</strong>”), CNPJ [CNPJ], sede em [ENDEREÇO COMPLETO].
        </p>
        <p>
          <strong>Encarregado (DPO):</strong> João Paulo Coutinho de Matos —{" "}
          <a href="mailto:jp.coutm@gmail.com" className="underline">jp.coutm@gmail.com</a>
        </p>
      </section>
      
      <article className="leading-relaxed space-y-8">
        {/* 1. Escopo */}
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Escopo e a quem se aplica</h2>
          <p>
            Esta Política descreve como o <strong>ChaveXLS</strong> coleta, utiliza, armazena e compartilha dados pessoais de visitantes, leads e usuários:
          </p>
            <ul className="list-disc pl-6 my-2 space-y-1">
              <li><strong>Durante o programa Beta</strong>, em caráter gratuito e experimental. </li>
              <li><strong>Após o lançamento comercial</strong>, em regime de assinatura.</li>
            </ul>
          <p>
            Ela se aplica a todas as interações com nosso site, landing pages, formulários, aplicativos e serviços de processamento de <strong>XML 
            de NF-e/NFC-e</strong>, incluindo as funcionalidades de “<strong>expiração em 48h</strong>” e “<strong>Apagar agora</strong>”.
          </p>
          <p>
            Ao utilizar nossos serviços, o Usuário declara estar ciente desta Política e também dos nossos 
            <a className="underline" href="/terms">Termos de Uso</a>, que integram este documento.
          </p>
        </section>

        {/* 2. Papéis e bases legais */}
        <section>
          <h2 className="text-xl font-semibold mb-2">2. Papéis e bases legais</h2>
          <h3 className="font-medium mb-1">Papéis no tratamento</h3>
          <ul className="list-disc pl-6 mb-3 space-y-1">
            <li>
              <strong>Operador</strong>: o <strong>ChaveXLS</strong> atua como Operador quando processa os <strong>Arquivos enviados 
              (ZIP/XML de NF-e/NFC-e)</strong> por conta e ordem do Usuário, exclusivamente para a geração das planilhas (Outputs).
            </li>
            <li>
              <strong>Controlador</strong>: o <strong>ChaveXLS</strong> atua como Controlador em relação a <strong>dados de conta, 
              comunicação com o Usuário, métricas de uso, segurança, prevenção a fraudes e atividades de marketing</strong>, 
              definindo as finalidades e meios do tratamento.
            </li>
          </ul>

          <h3 className="font-medium mb-1">Bases legais aplicáveis</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Execução de contrato ou medidas pré-contratuais</strong>: viabilizar a prestação do Serviço, processar Arquivos, 
              manter comunicações operacionais e atender solicitações do Usuário.
            </li>
            <li>
              <strong>Legítimo interesse</strong>: garantir segurança da informação, prevenir fraude e abuso, gerar estatísticas agregadas, 
              realizar testes A/B e melhorias de produto, sempre mediante avaliação de impacto e teste de balanceamento.
            </li>
            <li>
              <strong>Consentimento</strong>: envio de newsletter e comunicações promocionais (opt-in), uso de cookies não-essenciais ou 
              tecnologias equivalentes, quando aplicável.
            </li>
            <li>
              <strong>Cumprimento de obrigação legal ou regulatória</strong>: manutenção de registros mínimos, atendimento a solicitações de autoridades competentes e obrigações fiscais, contábeis ou consumeristas.
            </li>
          </ul>
        </section>

        {/* 3. Dados coletados */}
        <section>
          <h2 className="text-xl font-semibold mb-2">3. Dados que coletamos</h2>
          <p>
            O ChaveXLS coleta apenas os dados necessários para a operação do Serviço e para cumprir obrigações legais. 
            As principais categorias são:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Conta / lead</strong>: Nome (opcional), e-mail, informações de perfil (ex.: profissão/empresa), 
              volume mensal estimado de XMLs, plano preferido, aceite dos Termos de Uso e Política de Privacidade, 
              e conteúdo da “Mensagem” no formulário (opcional).
            </li>
            <li>
              <strong>Arquivos enviados</strong>: Arquivos digitais no formato ZIP/XML de NF-e/NFC-e (modelos 55/65), 
              processados exclusivamente para geração das planilhas (Outputs). Também são coletados metadados técnicos 
              mínimos, como hash do arquivo, tamanho e carimbos de data/hora.
            </li>
            <li>
              <strong>Uso e analytics</strong>: Informações de navegação, incluindo page views, rolagem, cliques em eventos 
              (ex.: <code>`form_start`</code>, <code>`lead_submit`</code>, <code>`pricing_interest_click`</code>, 
              <code>`sample_download`</code>), endereço IP abreviado, user-agent, data e hora de acesso.
            </li>
            <li>
              <strong>Logs técnicos</strong>: Registros automáticos de funcionamento do sistema, como eventos de erro, 
              endereços IP e identificadores de sessão, utilizados para segurança, depuração e prevenção a fraudes.
            </li>
            <li>
              <strong>Cookies e armazenamento local</strong>: Cookies estritamente necessários ao funcionamento do site e 
              cookies/armazenamento local de analytics (Google Analytics 4). Não utilizamos cookies de marketing sem consentimento prévio.
            </li>
            <li>
              <strong>Suporte e comunicações</strong>: Conteúdo de mensagens enviadas por formulários de contato, e-mails ou 
              outros canais de suporte, bem como nossas respostas.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Dados sensíveis.</strong> Não solicitamos nem processamos dados pessoais sensíveis (LGPD, art. 5º, II).
            Pedimos que você <strong>não inclua</strong> informações sensíveis nos arquivos ou no campo “Mensagem”. Caso tais
            dados sejam recebidos por engano, adotaremos medidas para <strong>excluí-los com segurança</strong>.
          </p>
        </section>

        {/* 4. Finalidades + retenção (tabela) */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            4. Finalidades, base legal e retenção
          </h2>

          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 border-b">Categoria de dado</th>
                  <th className="text-left p-3 border-b">Finalidade</th>
                  <th className="text-left p-3 border-b">Base legal</th>
                  <th className="text-left p-3 border-b">Retenção</th>
                </tr>
              </thead>
              <tbody>
                <tr className="align-top">
                  <td className="p-3 border-b">Conta / lead</td>
                  <td className="p-3 border-b">
                    Registro de leads do Beta, convites e comunicações operacionais
                  </td>
                  <td className="p-3 border-b">Execução de contrato</td>
                  <td className="p-3 border-b">
                    Até o fim do Beta, ou até opt-out
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="p-3 border-b">Arquivos (ZIP/XML)</td>
                  <td className="p-3 border-b">
                    Geração de XLSX/CSV com validações, conforme instruções do Usuário
                  </td>
                  <td className="p-3 border-b">Operador (instruções do Usuário)</td>
                  <td className="p-3 border-b">
                    <strong>48h</strong> (expiração automática) ou exclusão via <strong>“Apagar agora”</strong>; cópias de backup eliminadas em até 30 dias
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="p-3 border-b">Eventos / analytics</td>
                  <td className="p-3 border-b">
                    Medição de uso, testes A/B, métricas agregadas, melhoria contínua do produto
                  </td>
                  <td className="p-3 border-b">Legítimo interesse</td>
                  <td className="p-3 border-b">
                    Dados agregados e desidentificados mantidos; dados brutos rotacionados em 30–90 dias
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="p-3 border-b">Logs técnicos</td>
                  <td className="p-3 border-b">
                    Segurança, prevenção a fraude/abuso, monitoramento e depuração
                  </td>
                  <td className="p-3 border-b">Legítimo interesse</td>
                  <td className="p-3 border-b">
                    Rotação automática em 30–90 dias; sem retenção de conteúdo fiscal
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="p-3 border-b">Suporte / comunicações</td>
                  <td className="p-3 border-b">
                    Atendimento a solicitações, histórico de e-mails e formulários de contato
                  </td>
                  <td className="p-3 border-b">Execução de contrato</td>
                  <td className="p-3 border-b">
                    Até 12 meses após encerramento da conta ou até solicitação de exclusão
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="p-3 border-b">Newsletter / marketing</td>
                  <td className="p-3 border-b">
                    Envio de e-mails promocionais ou informativos (opt-in)
                  </td>
                  <td className="p-3 border-b"><strong>Consentimento</strong></td>
                  <td className="p-3 border-b">
                    Até revogação do consentimento (opt-out)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground mt-3">
            <strong>Nota:</strong> quando Operador, processamos <strong>apenas conforme suas instruções</strong> e
            exclusivamente para gerar o Output.
          </p>
        </section>

        {/* 5. Apagar agora + backups */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. “Apagar agora”, expiração e backups
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Expiração automática</strong>: todos os Arquivos enviados expiram e são excluídos do armazenamento ativo
              em até <strong>48 (quarenta e oito) horas</strong> após o upload, sem necessidade de ação do Usuário.
            </li>
            <li>
              <strong>Exclusão imediata (“Apagar agora”)</strong>: o Usuário pode solicitar a exclusão antecipada dos Arquivos
              a qualquer momento, utilizando o botão <strong>“Apagar agora”</strong>, o que resulta na remoção imediata do conteúdo do armazenamento ativo.
            </li>
            <li>
              <strong>Backups</strong>: cópias residuais que possam existir em sistemas de backup são expurgadas automaticamente
              no ciclo de rotação em até <strong>30 (trinta) dias</strong>, por meio de procedimentos técnicos de exclusão segura.
            </li>
            <li>
              <strong>Logs</strong>: os registros técnicos e de auditoria não armazenam o conteúdo fiscal dos Arquivos, mantendo
              apenas metadados mínimos necessários para fins de segurança e monitoramento.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Outputs e armazenamento.</strong> As planilhas (“Outputs”) são <strong>geradas para download e não são
            armazenadas</strong> de forma persistente pelo ChaveXLS. Durante o processamento, podem existir artefatos temporários
            exclusivamente para viabilizar a conversão, eliminados conforme os prazos e mecanismos descritos acima.
          </p>
        </section>

        {/* 6. Compartilhamento e subprocessadores */}
        <section>
          <h2 className="text-xl font-semibold mb-2">6. Compartilhamento e subprocessadores</h2>
        
          <ol className="list-decimal pl-6 space-y-3 leading-relaxed">
            <li>
              Para a plena operação do Serviço, o <strong>ChaveXLS</strong> poderá compartilhar dados pessoais com
              provedores terceirizados que atuam como <strong>subprocessadores</strong>, sempre em caráter limitado e
              com obrigações contratuais de confidencialidade e segurança. Exemplos de categorias:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Hospedagem e CDN</strong>: provedores de nuvem responsáveis pelo armazenamento e entrega segura dos dados.</li>
                <li><strong>Formulários e submissões</strong>: serviços utilizados para captura e gerenciamento de cadastros e mensagens.</li>
                <li><strong>Analytics</strong>: ferramentas de medição de uso (ex.: Google Analytics 4), utilizadas de forma desidentificada ou agregada, sempre que possível.</li>
                <li><strong>E-mail transacional e suporte</strong>: envio de notificações, confirmações, convites e respostas a solicitações de suporte.</li>
              </ul>
            </li>
        
            <li>
              <strong>Transferência internacional</strong>: alguns subprocessadores podem estar localizados em outros países
              (ex.: Estados Unidos ou União Europeia). Nesses casos, adotamos <strong>salvaguardas adequadas</strong>, incluindo
              <strong> cláusulas contratuais padrão</strong>, obrigações de confidencialidade e <strong>criptografia em trânsito</strong>
              (HTTPS) e, quando aplicável, <strong>em repouso</strong>, em conformidade com a LGPD.
            </li>
        
            <li>
              <strong>Outras hipóteses de compartilhamento</strong>: além dos subprocessadores listados, dados pessoais também
              poderão ser compartilhados quando houver: (i) cumprimento de obrigação legal ou regulatória; (ii) solicitação por
              autoridade competente; (iii) defesa em processos judiciais, administrativos ou arbitrais.
            </li>
        
            <li>
              Mantemos uma lista atualizada de subprocessadores em{" "}
              <a href="/subprocessors" className="underline">/subprocessors</a> (com finalidade, localização e política do provedor).
              Alterações relevantes serão comunicadas por aviso no site, com antecedência razoável.
            </li>
          </ol>
        </section>

        {/* 7. Segurança */}
        <section>
          <h2 className="text-xl font-semibold mb-2">7. Segurança</h2>
          <div className="space-y-3 leading-relaxed">
            <p>
              O <strong>ChaveXLS</strong> adota <strong>medidas técnicas e administrativas razoáveis</strong> para proteger os dados,
              incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Criptografia <strong>HTTPS</strong> em trânsito e, quando aplicável, criptografia em repouso.</li>
              <li>Aplicação do <strong>princípio do menor privilégio</strong> em acessos internos.</li>
              <li>Registros de auditoria e <strong>logs administrativos</strong> para monitoramento.</li>
              <li>Ferramentas de <strong>observabilidade e monitoramento contínuo</strong> (ex.: alertas de falhas, métricas técnicas).</li>
            </ul>
            <p>
              O conteúdo dos Arquivos enviados <strong>não é revisado manualmente</strong>, salvo em situações de depuração
              autorizada pelo Usuário e sempre sob dever de confidencialidade.
            </p>
            <p>
              Em caso de <strong>incidente de segurança relevante</strong>, notificaremos a <strong>ANPD</strong> e os titulares
              afetados, quando exigido pela LGPD, <strong>sem demora injustificada</strong>, além de adotar as medidas corretivas cabíveis.
            </p>
          </div>
        </section>

        {/* 8. Cookies e preferências */}
        <section>
          <h2 className="text-xl font-semibold mb-2">8. Cookies e preferências</h2>
          <div className="space-y-3 leading-relaxed">
            <p>
              Utilizamos cookies e tecnologias semelhantes para garantir o funcionamento adequado do site e do Serviço. 
              Classificamos os cookies em três categorias:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Estritamente necessários</strong>: essenciais para navegação e uso das funcionalidades básicas. 
                Não podem ser desativados.
              </li>
              <li>
                <strong>Analytics</strong>: usados para medir uso, desempenho e melhorar a experiência, 
                coletando dados de forma agregada e desidentificada sempre que possível.
              </li>
              <li>
                <strong>Marketing</strong> (se vierem a ser utilizados): apenas mediante <strong>consentimento prévio</strong>, 
                obtido por meio de <strong>banner de consentimento</strong> e opção de gerenciamento de preferências.
              </li>
            </ul>
            <p>
              O Usuário pode <strong>gerenciar ou desativar cookies</strong> diretamente no seu navegador ou, quando disponível, 
              nas preferências do banner. O bloqueio de certos cookies poderá impactar a experiência de uso do Serviço.
            </p>
          </div>
          <p>
            O Google Analytics é operado com <strong>IP anonimizado</strong> e <strong>recursos de publicidade desativados</strong>.
            Se viermos a utilizar cookies de marketing, será exibido <strong>banner de consentimento</strong> com registro de preferência
            e opção de gerenciamento a qualquer momento.
          </p>
        </section>

        {/* 9. Direitos do titular */}
        <section>
          <h2 className="text-xl font-semibold mb-2">9. Direitos do titular</h2>
          <div className="space-y-3 leading-relaxed">
            <p>
              Nos termos da LGPD, o Usuário, enquanto titular de dados pessoais, pode exercer os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Confirmação</strong> da existência de tratamento e <strong>acesso</strong> aos dados pessoais tratados.</li>
              <li><strong>Correção</strong> de dados incompletos, inexatos ou desatualizados.</li>
              <li><strong>Anonimização, bloqueio ou eliminação</strong> de dados desnecessários, excessivos ou tratados em desconformidade.</li>
              <li><strong>Portabilidade</strong> dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa.</li>
              <li><strong>Informação</strong> sobre entidades públicas e privadas com as quais realizamos uso compartilhado de dados.</li>
              <li><strong>Revogação</strong> do consentimento previamente concedido.</li>
              <li><strong>Oposição</strong> a tratamentos realizados com base em legítimo interesse, observados os critérios legais.</li>
              <li><strong>Revisão de decisões automatizadas</strong>, quando aplicável, que afetem seus interesses.</li>
            </ul>
            <p>
              O prazo de resposta às solicitações será de até <strong>15 (quinze) dias</strong>, conforme previsto na LGPD.
            </p>
            <p className="text-sm">
              <strong>Canal de atendimento:</strong>{" "}
              <a href="mailto:jp.coutm@gmail.com" className="underline">jp.coutm@gmail.com</a>. 
              Para arquivos enviados, também está disponível a função <strong>“Apagar agora”</strong> diretamente no produto.
            </p>
          </div>
          <p>
            Para sua segurança, poderemos solicitar <strong>informações razoáveis para verificação de identidade</strong> antes de
            atender pedidos de acesso, correção, exclusão, portabilidade ou oposição. A portabilidade será atendida na medida do
            <strong> tecnicamente possível</strong> e sem violar <strong>segredos comerciais</strong>, <strong>direitos de terceiros</strong>
            ou <strong>medidas de segurança</strong>.
          </p>
        </section>

        {/* 10. Crianças e adolescentes */}
        <section>
          <h2 className="text-xl font-semibold mb-2">10. Crianças e adolescentes</h2>
          <p>
            O Serviço é destinado exclusivamente a <strong>uso profissional e empresarial</strong>. 
            É vedada a utilização por <strong>menores de 18 anos</strong>, salvo quando atuarem como 
            representantes legais de pessoa jurídica. 
            Caso identifiquemos dados de menores enviados em desconformidade com esta Política, 
            tais dados serão <strong>eliminados</strong> e o acesso poderá ser suspenso ou encerrado.
          </p>
        </section>

        {/* 11. Alterações desta Política */}
        <section>
          <h2 className="text-xl font-semibold mb-2">11. Alterações desta Política</h2>
          <p>
            O <strong>ChaveXLS</strong> poderá atualizar esta Política de Privacidade a qualquer tempo. 
            A <strong>data da última atualização</strong> será sempre indicada no topo deste documento. 
            Alterações relevantes serão comunicadas por e-mail, notificação eletrônica ou banner em destaque no site, 
            com antecedência mínima de <strong>15 (quinze) dias</strong>, salvo em casos de necessidade emergencial 
            ou cumprimento imediato de obrigação legal/regulatória.
          </p>
        </section>

        {/* 12. Reclamações */}
        <section>
          <h2 className="text-xl font-semibold mb-2">12. Reclamações</h2>
          <p>
            Em caso de dúvidas, solicitações ou reclamações sobre esta Política ou o tratamento de dados pessoais, fale com o
            <strong> Encarregado (DPO)</strong> em{" "}
            <a href="mailto:jp.coutm@gmail.com" className="underline">jp.coutm@gmail.com</a>. Se entender que não houve
            solução adequada, você pode reclamar à{" "}
            <a href="https://www.gov.br/anpd/pt-br" className="underline"><strong>ANPD</strong></a>.
          </p>
          
        </section>

        {/* 13. Glossário (resumo) */}
        <section>
          <h2 className="text-xl font-semibold mb-2">13. Glossário (resumo)</h2>
          <div className="leading-relaxed space-y-2">
            <p>
              <strong>Controlador</strong>: pessoa natural ou jurídica a quem competem as decisões referentes ao tratamento 
              de dados pessoais (finalidades e meios).
            </p>
            <p>
              <strong>Operador</strong>: pessoa natural ou jurídica que realiza o tratamento de dados pessoais em nome do 
              Controlador, conforme suas instruções.
            </p>
            <p>
              <strong>Arquivos</strong>: arquivos digitais enviados pelo Usuário ao Serviço, contendo XML de NF-e/NFC-e 
              (modelos 55 e 65), sujeitos às regras de expiração e exclusão.
            </p>
            <p>
              <strong>Output</strong>: resultado do processamento dos Arquivos pelo Serviço, composto por planilhas 
              geradas em formato XLSX/CSV.
            </p>
          </div>
        </section>

        {/* (Opcional) DPA simplificado */}
        <section>
          <details className="border rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">
              Anexo — DPA simplificado (Operador/Controlador)
            </summary>
            <ol className="list-decimal pl-6 mt-3 space-y-2 leading-relaxed">
              <li>
                <strong>Partes:</strong> [Controlador] (Usuário) e [Operador] (<strong>ChaveXLS</strong>).
              </li>
              <li>
                <strong>Objeto:</strong> processamento de <strong>Arquivos</strong> (ZIP/XML de NF-e/NFC-e) para geração de 
                <strong> Outputs</strong> (planilhas XLSX/CSV).
              </li>
              <li>
                <strong>Instruções:</strong> o Operador tratará dados <strong>exclusivamente</strong> conforme instruções 
                documentadas do Controlador, sem desvio de finalidade.
              </li>
              <li>
                <strong>Subprocessadores:</strong> autorizados os listados em [URL/página dedicada], obrigados a 
                <strong> confidencialidade e segurança</strong> equivalentes.
              </li>
              <li>
                <strong>Segurança:</strong> medidas técnicas e organizacionais conforme esta Política, incluindo 
                criptografia, controle de acessos e registros de auditoria.
              </li>
              <li>
                <strong>Incidentes:</strong> notificação ao Controlador e, se aplicável, à <strong>ANPD</strong> e titulares, 
                sem demora injustificada, nos termos da LGPD.
              </li>
              <li>
                <strong>Retenção e devolução:</strong> expiração dos Arquivos em <strong>48h</strong>; exclusão via 
                <strong> “Apagar agora”</strong>; expurgo de backups em até <strong>30 dias</strong>.
              </li>
              <li>
                <strong>Auditorias:</strong> cooperação com solicitações razoáveis do Controlador ou da ANPD, limitadas a 
                questionários, relatórios ou evidências documentais adequadas.
              </li>
              <li>
                <strong>Transferências internacionais:</strong> realizadas com salvaguardas contratuais adequadas 
                (ex.: cláusulas padrão), conforme a LGPD.
              </li>
              <li>
                <strong>Término:</strong> destruição ou devolução dos dados conforme os prazos aqui definidos, ressalvadas 
                cópias necessárias para cumprimento legal.
              </li>
            </ol>
          </details>
        </section>

        {/* Rodapé de contato */}
        <section className="border-t pt-4 text-sm text-muted-foreground">
          Dúvidas? Escreva para{" "}
          <a className="underline" href="mailto:contato.chavexls@gmail.com">
            contato.chavexls@gmail.com
          </a>
          .
        </section>
      </article>
    </main>
  );
}
