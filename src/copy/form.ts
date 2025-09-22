// All form microcopy in one place.
export type Variant = 'A' | 'B';

export const formLabels = {
    name: 'Nome completo',
    email: 'Seu e-mail',
    profile: 'Perfil de uso',
    monthlyVolume: 'Volume mensal de XML (aprox.)',
    message: 'Mensagem (opcional)',
    plan: 'Plano desejado',
} as const;

export const formPlaceholders = {
    name: 'Maria Contábil',
    email: 'maria.contabil@empresa.com',
    profile: 'Contador, SMB, MEI, Outros',
    monthlyVolume: 'Ex.: 300',
    message: '(Opcional) Conte um pouco sobre sua empresa e suas necessidades...',
} as const;

export const formHints = {
    email: 'Usaremos este e-mail para enviar o convite do Beta e comunicados importantes.',
    monthlyVolume: 'Apenas uma estimativa. Ajuda a calibrar a fila do Beta.',
    consent: 'Obrigatório para enviar o formulário.',
} as const;

// Buttons and statuses
export const cta = (variant: Variant) =>
    variant === 'B' ? 'Entrar no Beta' : 'Entrar no Beta';

export const ctaSecondary = (variant: Variant) =>
    variant === 'B' ? 'Gerar XLSX de exemplo (~3s)' : 'Reservar preço fundador (-30% / 12 meses)';

// A11y strings and ARIA helpers
export const a11y = {
    statusRegionLabel: 'Status do envio',
    errorRegionLabel: 'Erros do formulário',
    requiredMark: '(obrigatório)',
} as const;

// Server/Network errors
export const errors = {
  timeout: 'Demorou mais do que o esperado. Tente novamente em instantes.',
  tooMany: 'Muitos envios em sequência. Aguarde alguns segundos e tente de novo.',
  network: 'Sem conexão? Verifique sua internet e tente novamente.',
  unknown: 'Algo não saiu como esperado. Tente outra vez.',
} as const;