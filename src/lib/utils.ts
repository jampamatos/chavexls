/** Concatenate CSS class names, ignoring falsey values */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Format a number as BRL currency (fallback-safe) */
export function formatBRL(n: number): string {
  try {
    return n.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  } catch {
    // Last-resort fallback; mirrors decimal format with comma
    return `R$ ${Number.isFinite(n) ? n.toFixed(2).replace('.', ',') : '0,00'}`;
  }
}
