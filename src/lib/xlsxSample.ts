// Build an example NF-e workbook for the offline demo (no uploads).

type MaybePromise<T> = T | Promise<T>;
export type XLSXLike = {
  utils: {
    book_new: () => any;
    aoa_to_sheet: (data: any[][]) => any;
    book_append_sheet: (wb: any, ws: any, name: string) => void;
  };
  writeFile: (wb: any, file: string) => MaybePromise<void>; // older API
  writeFileXLSX?: (wb: any, file: string) => MaybePromise<void>; // newer API
};

const SHEETS = {
  Notas: [
    'chave_acesso','modelo','serie','numero','data_emissao','data_saida_entrada',
    'tipo_operacao','natureza_operacao','finalidade','situacao',
    'protocolo_autorizacao','emit_cnpj','dest_cnpj_cpf',
    'valor_total_nfe','valor_produtos','valor_frete','valor_seguro','valor_desconto',
    'valor_icms','valor_pis','valor_cofins','municipio_emissor','uf_emissor',
    'ambiente','contingencia','link_consulta',
  ],
  Itens: [
    'chave_acesso','num_item','codigo_produto','descricao','ncm','cest','cfop',
    'quantidade','unidade','valor_unitario','valor_total_item','desconto_item',
    'frete_item','seguro_item','outros_item','origem','cst_csosn','bc_icms',
    'aliq_icms','valor_icms','bc_ipi','aliq_ipi','valor_ipi','bc_pis','aliq_pis',
    'valor_pis','bc_cofins','aliq_cofins','valor_cofins',
  ],
  Emitentes: [
    'emit_cnpj','emit_razao_social','emit_nome_fantasia','emit_ie','emit_crt',
    'end_logradouro','end_numero','end_bairro','end_municipio','end_uf','end_cep',
    'telefone','email',
  ],
  Destinatarios: [
    'dest_cnpj_cpf','dest_razao_social','dest_ie','ind_ie_dest','end_logradouro',
    'end_numero','end_bairro','end_municipio','end_uf','end_cep','telefone','email',
  ],
  Totais: [
    'chave_acesso','q_itens','vBC','vICMS','vBCST','vST','vProd','vFrete','vSeg',
    'vDesc','vII','vIPI','vPIS','vCOFINS','vOutro','vNF','vTotTrib',
  ],
  Resumo: ['Mensagem'],
  'Leia-me': ['Texto'],
  Totais_NCM_CFOP: [
    'ncm','cfop','Qtde','V_Produtos','Base_ICMS','ICMS','Base_PIS','PIS','Base_COF','COFINS',
  ],
} as const;

/** Minimal helper to format ISO date without TZ drift */
function isoDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
}

/** Build a consistent fake invoice with 3 items and coherent totals */
function makeSampleData() {
  const chave = '35250112345678000123550010000001234567890123'; // 44 chars
  const hoje = new Date();
  const emissao = isoDate(hoje);
  const saida = emissao;

  // Items
  const items = [
    { num: 1, cod: 'PROD-001', desc: 'Produto A', ncm: '0401.20.10', cest: '', cfop: '5102', qtd: 2, un:'UN', unit: 49.90, orig: 0, csosn:'102' },
    { num: 2, cod: 'PROD-002', desc: 'Produto B', ncm: '1905.31.00', cest: '', cfop: '5102', qtd: 5, un:'UN', unit: 9.99,  orig: 0, csosn:'102' },
    { num: 3, cod: 'PROD-003', desc: 'Produto C', ncm: '7323.93.00', cest: '', cfop: '5102', qtd: 1, un:'UN', unit: 199.00,orig: 0, csosn:'102' },
  ];

  const vFrete = 0;
  const vSeg   = 0;
  const vDesc  = 0;

  const vProd = Number(items.reduce((s, it) => s + it.qtd * it.unit, 0).toFixed(2));
  const vNF   = vProd + vFrete + vSeg - vDesc;
  const vPIS  = Number((vProd * 0.0165).toFixed(2));
  const vCOF  = Number((vProd * 0.076).toFixed(2));
  const vBC   = vProd;
  const vICMS = Number((vBC * 0.18).toFixed(2));
  const vTotTrib = Number((vICMS + vPIS + vCOF).toFixed(2));

  return {
    chave,
    emissao,
    saida,
    vProd, vFrete, vSeg, vDesc, vNF,
    vPIS, vCOF, vBC, vICMS, vTotTrib,
    items,
  };
}

/** Convert arrays-of-arrays to a sheet and append to the book */
function appendSheet(xlsx: XLSXLike, wb: any, name: keyof typeof SHEETS, rows: any[][]) {
  const aoa = [Array.from(SHEETS[name]), ...rows];
  const ws = xlsx.utils.aoa_to_sheet(aoa);
  xlsx.utils.book_append_sheet(wb, ws, name as string);
}

/** Build the workbook with the exact sheet names we publish */
export function buildSampleWorkbook(xlsx: XLSXLike) {
  const d = makeSampleData();
  const wb = xlsx.utils.book_new();

  // Notas
  appendSheet(xlsx, wb, 'Notas', [[
    d.chave, 55, 1, 123, d.emissao, d.saida, 'Saída', 'Venda de mercadoria', 'Normal',
    'Autorizada', '152501000000000', '12.345.678/0001-23', '987.654.321-00',
    d.vNF, d.vProd, d.vFrete, d.vSeg, d.vDesc, d.vICMS, d.vPIS, d.vCOF,
    'São Paulo', 'SP', 'Produção', 'Não', 'https://www.nfe.fazenda.sp.gov.br',
  ]]);

  // Itens
  appendSheet(xlsx, wb, 'Itens',
    d.items.map((it) => ([
      d.chave, it.num, it.cod, it.desc, it.ncm, it.cest, it.cfop,
      it.qtd, it.un, it.unit, Number((it.qtd * it.unit).toFixed(2)),
      0, 0, 0, 0, it.orig, it.csosn,
      Number((it.qtd * it.unit).toFixed(2)), 18, Number((it.qtd * it.unit * 0.18).toFixed(2)),
      0, 0, 0,
      Number((it.qtd * it.unit).toFixed(2)), 1.65, Number((it.qtd * it.unit * 0.0165).toFixed(2)),
      Number((it.qtd * it.unit).toFixed(2)), 7.6, Number((it.qtd * it.unit * 0.076).toFixed(2)),
    ]))
  );

  // Emitentes
  appendSheet(xlsx, wb, 'Emitentes', [[
    '12.345.678/0001-23', 'Empresa Exemplo S/A', 'Exemplo', '123.456.789.000',
    '3 - Regime Normal', 'Rua da Amostra', '100', 'Centro', 'São Paulo', 'SP', '01000-000',
    '(11) 99999-9999', 'contato@exemplo.com.br',
  ]]);

  // Destinatarios
  appendSheet(xlsx, wb, 'Destinatarios', [[
    '987.654.321-00', 'Cliente Exemplo', 'ISENTO', '9', 'Av. das Notas',
    '999', 'Bairro', 'Rio de Janeiro', 'RJ', '22000-000', '(21) 98888-8888', 'cliente@exemplo.com',
  ]]);

  // Totais
  appendSheet(xlsx, wb, 'Totais', [[
    d.chave, d.items.length, d.vBC, d.vICMS, 0, 0, d.vProd, d.vFrete, d.vSeg, d.vDesc,
    0, 0, d.vPIS, d.vCOF, 0, d.vNF, d.vTotTrib,
  ]]);

  // Totais_NCM_CFOP (grouped, simplified)
  const byNcm = new Map<string, {qt:number, v:number}>();
  d.items.forEach(it => {
    const agg = byNcm.get(it.ncm) || {qt:0, v:0};
    agg.qt += it.qtd;
    agg.v  += it.qtd * it.unit;
    byNcm.set(it.ncm, agg);
  });
  appendSheet(xlsx, wb, 'Totais_NCM_CFOP',
    Array.from(byNcm.entries()).map(([ncm, agg]) => ([
      ncm, '5102', agg.qt, Number(agg.v.toFixed(2)),
      Number((agg.v).toFixed(2)), Number((agg.v * 0.18).toFixed(2)),
      Number((agg.v).toFixed(2)), Number((agg.v * 0.0165).toFixed(2)),
      Number((agg.v).toFixed(2)), Number((agg.v * 0.076).toFixed(2)),
    ]))
  );

  // Resumo
  appendSheet(xlsx, wb, 'Resumo', [[
    'Amostra gerada localmente no seu navegador. Nenhum arquivo foi enviado.',
  ]]);

  // Leia-me
  appendSheet(xlsx, wb, 'Leia-me', [[
    'Este arquivo é apenas um exemplo. Para melhor qualidade, use seus XMLs reais.',
  ]]);

  return wb;
}

/** Generate and download the sample file */
export async function downloadSampleXlsx(xlsx: XLSXLike, filename = 'chavexls_demo.xlsx') {
  const wb = buildSampleWorkbook(xlsx);
  // Call method directly to preserve 'this' bindind
  if (xlsx.writeFileXLSX) {
    await xlsx.writeFileXLSX(wb, filename);
  } else {
    await xlsx.writeFile(wb, filename);
  }
}

// Convenience: instantiate ExcelJS adapter and download directly
export async function downloadSampleXlsxWithExcelJS(filename = 'chavexls_demo.xlsx') {
  const { ExcelJSXLSX } = await import('./xlsxLikeExcelJS');
  return downloadSampleXlsx(ExcelJSXLSX as unknown as XLSXLike, filename);
}
