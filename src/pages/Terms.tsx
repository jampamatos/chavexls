/** Beta program terms page — versão expandida com campos entre colchetes */
export default function Terms() {
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
        Termos do Beta / Termos de Uso — Versão base
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        <strong>Última atualização:</strong> 08/09/2025
      </p>

      {/* Identificação */}
      <section className="leading-relaxed space-y-2 mb-6">
        <p>
          <strong>Encarregado (DPO):</strong> João Paulo Coutinho de Matos — 
          <a href="mailto:jp.coutm@gmail.com" className="underline">jp.coutm@gmail.com</a>
        </p>
        <p>
          <strong>Controladora:</strong> [A definir] (“
          <strong>ChaveXLS</strong>”), CNPJ [a definir], sede em [a definir].
        </p>
        <p>
          <strong>Contato:</strong> <a href="mailto:contato.chavexls@gmail.com" className="underline">contato.chavexls@gmail.com</a>
        </p>
      </section>

      <article className="leading-relaxed space-y-8">
        {/* 1. Aceitação e atualizações */}
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Aceitação e atualizações</h2>
          <p>
            Ao acessar ou utilizar o site e os serviços do <strong>ChaveXLS</strong>, você declara ter lido,
            compreendido e aceitado integralmente estes Termos, bem como a nossa{" "}
            <a href="/privacy" className="underline">
              Política de Privacidade
            </a>
            . Estes Termos passam a vigorar a partir da data indicada no cabeçalho e podem ser alterados a qualquer tempo. 
            É responsabilidade do Usuário acompanhar eventuais atualizações. Alterações relevantes poderão ser comunicadas 
            por e-mail, notificação eletrônica ou aviso em destaque no site.
          </p>
          <p>
            Alterações materiais serão comunicadas com antecedência mínima de <strong>15 (quinze) dias</strong>, salvo em 
            casos de necessidade emergencial.
          </p>
        </section>

        {/* 2. Definições */}
        <section>
          <h2 className="text-xl font-semibold mb-2">2. Definições</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Serviço</strong>: a solução tecnológica disponibilizada
              pelo <strong>ChaveXLS</strong> para conversão de arquivos XML 
              de NF-e/NFC-e em planilhas estruturadas (XLSX/CSV), com aplicação 
              de regras e validações automatizadas.
            </li>
            <li>
              <strong>Beta</strong>: fase experimental do Serviço, fornecida em caráter 
              temporário, sem garantia de nível de serviço (SLA) e sujeita a alterações 
              ou descontinuação a qualquer momento.
            </li>
            <li>
              <strong>Usuário</strong>: pessoa física ou jurídica que acessa e utiliza o 
              Serviço, assumindo integralmente as responsabilidades decorrentes de seu uso.
            </li>
            <li>
              <strong>Arquivos</strong>: os arquivos digitais (ZIP/XML) enviados pelo Usuário 
              para processamento no Serviço.
            </li>
            <li>
              <strong>Output</strong>: as planilhas geradas automaticamente pelo Serviço a 
              partir dos Arquivos enviados, entregues em formato XLSX/CSV.
            </li>
          </ul>
        </section>

        {/* 3. Programa Beta */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            3. Programa Beta (escopo e limitações)
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              O Serviço é disponibilizado <strong>“no estado em que se encontra”</strong>, 
              em caráter <strong>experimental, sem garantias de continuidade, 
              disponibilidade, desempenho ou adequação a finalidades específicas</strong>.
            </li>
            <li>
                O ChaveXLS poderá, a seu exclusivo critério, estabelecer <strong>limites 
                de volume, capacidade de fila, tamanho de arquivos ou frequência de uso</strong>, 
                bem como alterar, suspender ou descontinuar funcionalidades a qualquer 
                tempo, sem aviso prévio.
            </li>
            <li>
                Durante o período Beta, <strong>não haverá cobrança pela utilização do Serviço</strong>.
            </li>
            <li>
                Usuários que aderirem ao Beta poderão ser elegíveis ao benefício de 
                <strong>“preço de fundador”</strong>, consistente em <strong>30% (trinta por cento) de desconto</strong> 
                por 12 (doze) meses após o lançamento comercial, <strong>sujeito à confirmação 
                de disponibilidade e às condições comerciais vigentes</strong>. Os valores divulgados 
                durante o Beta têm caráter <strong>meramente estimativo</strong> e poderão ser ajustados no 
                lançamento oficial. A concessão do benefício será formalizada por meio de 
                confirmação em conta ou comunicação por e-mail.
            </li>
          </ol>
        </section>

        {/* 4. Público-alvo e elegibilidade */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Público-alvo e elegibilidade
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
                Ao utilizar o Serviço, o Usuário declara possuir <strong>plena capacidade legal</strong> para contratar e, 
                no caso de pessoa jurídica, deter os <strong>poderes de representação necessários</strong>  para assumir
                obrigações em nome da organização que representa.
            </li>
            <li>
                O Usuário também declara possuir os <strong>direitos e autorizações necessários</strong> para realizar o tratamento dos 
                dados constantes nos arquivos XML submetidos ao Serviço, assumindo integral responsabilidade pelo seu uso.
            </li>
            <li>
                O Serviço é destinado a fins <strong>profissionais e empresariais</strong>, não sendo apropriado para uso pessoal, doméstico ou recreativo.
            </li>
            <li>
                O Serviço é destinado a <strong>uso profissional e empresarial</strong>. É vedado a <strong>menores de 18 anos</strong>, salvo quando atuarem 
                como representantes legais de pessoa jurídica.
            </li>
          </ol>
        </section>

        {/* 5. Responsabilidades do Usuário */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. Responsabilidades do Usuário
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              O Usuário declara e garante que possui a <strong>base legal adequada</strong>, nos termos da LGPD e demais normas aplicáveis, 
              para o tratamento e o compartilhamento dos <strong>dados pessoais contidos nos Arquivos</strong> enviados, responsabilizando-se integralmente 
              por informar os titulares e, quando aplicável, obter os consentimentos necessários, bem como por eventual violação de direitos de terceiros, 
              inclusive de sigilo, privacidade, propriedade intelectual ou contratual.
            </li>
            <li>
              É expressamente vedado ao Usuário:
              <ol className="list-[lower-alpha] pl-6 space-y-1 mt-2">
                <li>enviar ou tentar enviar <strong>malware, vírus ou código malicioso;</strong></li>
                <li>explorar vulnerabilidades, realizar testes de intrusão ou qualquer forma de ataque à segurança;</li>
                <li>praticar engenharia reversa, descompilação ou tentativa de obtenção do código-fonte do Serviço;</li>
                <li>contornar limites técnicos, de volume ou de uso impostos pelo ChaveXLS;</li>
                <li>utilizar o Serviço para fins ilícitos, fraudulentos ou em desconformidade com a legislação vigente.</li>
              </ol>
            </li>
            <li>
              O Usuário compromete-se a não incluir nos Arquivos ou no campo de “Mensagem” informações que não sejam necessárias 
              ao uso do Serviço, em especial <strong>senhas, chaves de acesso, dados pessoais sensíveis</strong> (nos termos da LGPD) ou qualquer 
              conteúdo irrelevante para a conversão de NF-e/NFC-e.
            </li>
          </ol>
        </section>

        {/* 6. Propriedade intelectual e licenças */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            6. Propriedade intelectual e licenças
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              O <strong>ChaveXLS</strong> é titular exclusivo de todos os direitos de propriedade intelectual relacionados ao site, marca, código-fonte, 
              interface, layout, funcionalidades, conteúdos e demais materiais disponibilizados, sendo vedada qualquer utilização não expressamente 
              autorizada nestes Termos.
            </li>
            <li>
              Ao Usuário é concedida uma <strong>licença pessoal, limitada, não exclusiva, intransferível e revogável</strong> para acessar e utilizar o Serviço, 
              exclusivamente para fins legítimos e em conformidade com estes Termos.
            </li>
            <li>
              O Usuário mantém integral propriedade sobre os <strong>Arquivos enviados</strong> e os <strong>Outputs gerados</strong>, cabendo ao ChaveXLS apenas 
              a <strong>licença restrita, temporária e não exclusiva</strong> para processar os Arquivos, exclusivamente com a finalidade de fornecer o 
              Output correspondente.
            </li>
            <li>
                Qualquer <strong>sugestão, comentário, ideia ou feedback</strong> enviado pelo Usuário ao ChaveXLS poderá ser utilizado pela empresa de 
                forma gratuita, perpétua, irrevogável, mundial e não exclusiva, sem obrigação de reconhecimento ou compensação financeira.
            </li>
          </ol>
        </section>

        {/* 7. Pagamentos (pós-Beta) */}
        <section>
          <h2 className="text-xl font-semibold mb-2">7. Pagamentos (pós-Beta)</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
                Após o encerramento da fase Beta, o acesso ao Serviço será oferecido exclusivamente em regime de <strong>assinatura mensal</strong>, 
            com valores expressos em <strong>Reais (R$)</strong>, já incluídos todos os tributos incidentes.
            </li>
            <li>
                O <strong>ChaveXLS</strong> poderá reajustar os preços a qualquer tempo, mediante comunicação prévia enviada por e-mail ou
                aviso no site, com antecedência mínima de <strong>30 (trinta) dias</strong> em relação à próxima cobrança.
            </li>
            <li>
                O cancelamento realizado pelo Usuário implicará a <strong>não renovação automática</strong> da assinatura no próximo ciclo de
                faturamento, permanecendo o acesso ativo até o término do período já pago.
            </li>
            <li>
                <strong>Política de reembolso:</strong> por se tratar de serviço digital disponibilizado de forma imediata, <strong>não há
                    reembolso</strong> de valores já pagos, salvo disposição legal em contrário.
            </li>
            <li>
                Caso venham a ser oferecidos, <strong>períodos de avaliação gratuita (trials)</strong> ou promoções especiais terão suas condições,
                prazos e limitações definidos no momento da adesão, prevalecendo sobre estas disposições gerais.
            </li>
          </ol>
        </section>

        {/* 8. Suspensão, término e efeitos */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            8. Suspensão, término e efeitos
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
                O <strong>ChaveXLS</strong> poderá suspender ou encerrar o acesso do Usuário ao Serviço, a seu exclusivo critério, 
                nos seguintes casos:
                <ol className="list-[lower-alpha] pl-6 space-y-1 mt-2">
                  <li>violação destes Termos ou da Política de Privacidade;</li>
                  <li>risco identificado à segurança ou estabilidade do Serviço;</li>
                  <li>prática de abuso, fraude ou uso ilícito;</li>
                  <li>descumprimento de obrigações legais ou contratuais;</li>
                  <li>determinação judicial ou de autoridade competente.</li>
                </ol>
            </li>
            <li>
                Na hipótese de rescisão, o acesso do Usuário ao Serviço será imediatamente cessado, e os <strong>Arquivos remanescentes</strong> 
                serão excluídos conforme os prazos e procedimentos estabelecidos na Política de Privacidade.
            </li>
            <li>
                As disposições relativas a <strong>propriedade intelectual, responsabilidade, limitações de responsabilidade, isenções, 
                indenizações e foro</strong> permanecerão vigentes e continuarão a produzir efeitos mesmo após o término da relação contratual.
            </li>
          </ol>
          <p>
            Após o término do vínculo, o <strong>ChaveXLS</strong> apagará os <strong>Arquivos remanescentes em até 48h</strong>, ressalvadas 
            cópias de segurança por período estritamente necessário para fins legais ou de auditoria, findo o qual serão eliminadas. O retorno 
            de dados poderá ser viabilizado mediante solicitação razoável do Usuário.
          </p>
        </section>

        {/* 9. Isenções e limites */}
        <section>
          <h2 className="text-xl font-semibold mb-2">9. Isenções e limites</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
                O <strong>ChaveXLS</strong> não presta serviços de consultoria fiscal, contábil ou tributária. As planilhas geradas 
                pelo Serviço possuem caráter <strong>meramente auxiliar</strong> e podem conter erros, devendo o Usuário e/ou seu 
                contador realizar a conferência final antes de qualquer uso oficial ou declaração perante órgãos públicos.
            </li>
            <li>
                O Serviço é fornecido <strong>sem qualquer garantia expressa ou implícita</strong>, incluindo, mas não se limitando, 
                às garantias de comerciabilidade, adequação a um propósito específico, precisão ou não violação de direitos de terceiros.
            </li>
            <li>
                <strong>Limitação de responsabilidade</strong>: a responsabilidade total e agregada do <strong>ChaveXLS</strong> ficará 
                limitada ao <strong>menor entre (i) R$ 1.000,00 e (ii) o montante efetivamente pago nos 12 (doze) meses anteriores ao 
                evento</strong>, exceto em casos de <strong>dolo ou culpa grave</strong>.
            </li>
            <li>
                A responsabilidade total e agregada do ChaveXLS por quaisquer danos diretos decorrentes do uso do Serviço ficará limitada 
                ao <strong>menor valor entre (i) R$ 1.000,00 (mil reais) e (ii) o montante efetivamente pago pelo Usuário ao ChaveXLS nos 
                últimos 12 (doze) meses que antecederam o evento que originou a responsabilidade</strong>. Esta limitação não se aplica 
                a hipóteses de <strong>dolo ou culpa grave atribuíveis ao ChaveXLS</strong>, nos termos da legislação vigente.
            </li>
            <li>
                <strong>Indenização:</strong> o Usuário concorda em indenizar, defender e isentar o ChaveXLS, suas afiliadas, sócios, 
                administradores e colaboradores de quaisquer reclamações, responsabilidades, perdas, danos ou despesas (incluindo 
                honorários advocatícios) decorrentes de:
                <ol className="list-[lower-alpha] pl-6 space-y-1 mt-2">
                    <li>uso indevido dos Arquivos ou do Serviço;</li>
                    <li>violação destes Termos ou da legislação aplicável;</li>
                    <li>infração de direitos de terceiros.</li>
                </ol>
            </li>
          </ol>
          <p>
            Logs técnicos poderão ser mantidos por período limitado para fins de segurança e prevenção a fraudes, não contendo dados fiscais sensíveis.
          </p>
        </section>

        {/* 10. Terceiros e links */}
        <section>
          <h2 className="text-xl font-semibold mb-2">10. Terceiros e links</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
                Para a operação do Serviço, o <strong>ChaveXLS</strong> poderá utilizar provedores externos, incluindo, mas não se limitando, 
                a <strong>serviços de hospedagem e CDN, processamento de formulários, envio de e-mails transacionais e ferramentas de analytics. </strong>
                Esses provedores atuarão como <strong>subprocessadores</strong> e estarão sujeitos a obrigações contratuais de confidencialidade e segurança.
            </li>
            <li>
                O site e o Serviço podem conter <strong>links para páginas de terceiros</strong>. O ChaveXLS <strong>não controla nem endossa</strong> o 
                conteúdo, políticas ou práticas desses sites, não se responsabilizando por quaisquer danos ou prejuízos decorrentes do seu acesso ou utilização. 
                O uso de sites de terceiros é de exclusiva responsabilidade do Usuário, que deverá verificar os respectivos <strong>termos de uso e políticas 
                de privacidade.</strong>
            </li>
            <li>
              O Usuário <strong>autoriza</strong> o uso de suboperadores (como hospedagem, CDN, e-mail e analytics), inclusive com <strong>transferência 
                internacional de dados</strong>, sujeitos a salvaguardas adequadas. A lista atualizada poderá constar na 
                <a href="/privacy" className="underline">Política de Privacidade</a>, e mudanças relevantes serão informadas por aviso no site.
            </li>
          </ol>
        </section>

        {/* 11. Privacidade e proteção de dados */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            11. Privacidade e proteção de dados
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
                O tratamento de dados pessoais pelo <strong>ChaveXLS</strong> será realizado nos termos da nossa{" "}
                <a className="underline" href="/privacy">Política de Privacidade</a>, que integra estes Termos.
            </li>
            <li>
                Para os <strong>Arquivos enviados (ZIP/XML de NF-e/NFC-e)</strong>, o ChaveXLS atuará como <strong>Operador</strong>, 
                processando os dados exclusivamente conforme as instruções do Usuário e para a geração dos respectivos Outputs.
            </li>
            <li>
                Para os <strong>dados de conta, comunicações, analytics, segurança e marketing</strong>, o ChaveXLS atuará como <strong>Controlador</strong>, 
                definindo as finalidades e meios do tratamento, sempre em conformidade com a LGPD.
            </li>
            <li>
                O Usuário é o <strong>único responsável por assegurar a base legal adequada</strong> para o envio e tratamento dos dados constantes 
                nos Arquivos, nos termos da legislação aplicável.
            </li>
          </ol>

          <p>
            O <strong>ChaveXLS</strong> adota <strong>medidas técnicas e administrativas razoáveis</strong> para proteger os dados, incluindo 
            criptografia em trânsito (HTTPS), controles de acesso e registros de auditoria. Incidentes de segurança relevantes serão tratados 
            e comunicados <strong>nos termos da LGPD</strong>.
          </p>
          <p>
            O Usuário poderá exercer, de forma razoável, o direito de auditoria quanto ao tratamento realizado pelo ChaveXLS na condição de 
            Operador, limitado a questionários, relatórios de auditoria de terceiros independentes ou outras evidências documentais adequadas.
          </p>
        </section>

        {/* 12. Lei aplicável e foro */}
        <section>
          <h2 className="text-xl font-semibold mb-2">12. Lei aplicável e foro</h2>
          <p>
            Estes Termos serão regidos e interpretados de acordo com a <strong>legislação brasileira</strong>.
            Fica eleito o foro da comarca de <strong>Juiz de Fora/MG</strong>, com renúncia a qualquer outro, por mais privilegiado que seja.
          </p>
        </section>

        {/* 13. Disposições gerais */}
        <section>
          <h2 className="text-xl font-semibold mb-2">13. Disposições gerais</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
                <strong>Cessão:</strong> o Usuário não poderá ceder ou transferir a terceiros os direitos e obrigações decorrentes destes 
                Termos sem autorização prévia e por escrito do ChaveXLS. O ChaveXLS poderá ceder ou transferir seus direitos e obrigações 
                a afiliadas, sucessores ou em caso de reorganização societária.
            </li>
            <li>
                <strong>Independência das cláusulas</strong>: caso qualquer disposição destes Termos seja considerada inválida, ilegal ou 
                inexequível, as demais permanecerão em pleno vigor e efeito.
            </li>
            <li>
                <strong>Força maior:</strong> o ChaveXLS não será responsável por falhas ou atrasos resultantes de eventos fora de seu controle 
                razoável, incluindo, mas não se limitando, a desastres naturais, falhas de energia, atos governamentais, greves, ataques 
                cibernéticos ou interrupções de redes de telecomunicações.
            </li>
            <li>
                <strong>Notificações eletrônicas:</strong> todas as comunicações poderão ser realizadas por meios eletrônicos, incluindo e-mail 
                enviado ao endereço informado pelo Usuário ou aviso publicado no site, produzindo os mesmos efeitos de comunicações escritas.
            </li>
            <li>
                <strong>Acordo integral:</strong> estes Termos constituem o acordo integral entre o Usuário e o ChaveXLS em relação ao objeto aqui 
                tratado, substituindo negociações, propostas ou entendimentos anteriores, verbais ou escritos.
            </li>
            <li>
                <strong>Conflito de versões:</strong> em caso de divergência de interpretação entre versões em outros idiomas, prevalecerá a versão 
                em Português-Brasil.
            </li>
          </ol>
        </section>

        {/* Rodapé de contato (opcional) */}
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
