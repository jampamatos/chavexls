# ChaveXLS — Landing Page

Landing page premium para o app ChaveXLS (conversão de XML de NF-e em planilhas fiscais).  
Este repositório **não é o produto**: ele entrega a **experiência de marketing** já pronta para captação de leads, validação de demanda e oferta de Beta. O app completo ainda pode ser construído.

## Por que esse projeto é vendável

- **Copy e narrativa prontas**: promessa clara, prova social via demo local, e argumentos de valor para contábil/fiscal.
- **Design system leve**: tokens de cor, tipografia e componentes reutilizáveis (Tailwind v4 + CSS tokens).
- **A/B testing nativo**: variantes A e B com roteamento inteligente e persistência de variante.
- **LGPD e confiança**: páginas de Termos, Privacidade e Subprocessadores já estruturadas.
- **Captação em produção**: formulário integrado ao Netlify com UTMs e parâmetros de campanha.
- **Demo realista**: geração de XLSX de exemplo 100% local no navegador (ExcelJS).

## Estado atual (o que existe hoje)

- Landing page completa com seções: Hero, Como funciona, Público-alvo, Benefícios, Pricing, FAQ, Segurança/LGPD e CTA final.
- Variantes A/B já implementadas (`VariantA` e `VariantB`) com tracking.
- Formulário de inscrição no Beta (Netlify forms + campos ocultos de UTM).
- Playground de demo com geração de XLSX de exemplo **offline**.
- Páginas legais: Termos, Privacidade e Subprocessadores.

## O que ainda falta (escopo do app)

- Upload real de ZIP com XML (55/65) e processamento backend.
- Pipeline de validação fiscal + geração de XLSX final.
- Painel do usuário, autenticação e billing.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4 (tokens em `src/index.css`)
- React Router (páginas legais e variantes)
- ExcelJS (geração de XLSX no demo)

## Como rodar localmente

Requisitos: Node `>=22.12.0 <23`

```bash
npm install
npm run dev
```

## Scripts úteis

- `npm run dev` — dev server
- `npm run build` — build de produção
- `npm run preview` — preview local do build
- `npm run lint` — lint do projeto

## Estrutura rápida

- `src/pages/VariantA.tsx` — landing versão A (ênfase em preço fundador)
- `src/pages/VariantB.tsx` — landing versão B (ênfase em demo)
- `src/components/` — seções e blocos reutilizáveis
- `src/lib/analytics.ts` — tracking + consentimento
- `src/lib/utm.ts` — captura e persistência de UTMs
- `src/pages/Terms.tsx` — Termos do Beta
- `src/pages/Privacy.tsx` — Política de Privacidade
- `src/pages/Subprocessors.tsx` — Subprocessadores (LGPD)

## Variantes A/B

- Aleatório 50/50 na primeira visita, com persistência via `localStorage`.
- Forçar variante com querystring: `/?v=a` ou `/?v=b`.

## Observações de produto (para próximos passos)

Este repo está pronto para **validar demanda e captar leads**.  
Se for transformar em app completo, o próximo passo natural é conectar:

- upload real de XML,
- serviço de processamento,
- geração de planilhas finais por backend,
- autenticação e cobrança.

Dessa forma, o MVP completo entregaria valor real ao usuário final.
