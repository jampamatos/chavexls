declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}
import type { PlanId } from './pricing';
import type { UTMKey } from './utm';

/** Initialize GA4 script and configuration */
export function initGA(id: string): void {
    if (typeof window.gtag === 'function') return; // tag already initialized
    if (!id) {
        if (import.meta.env.PROD) console.warn("[GA4] VITE_GA4_ID missing in production build");
        return;
    }

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer!.push(args);
    window.gtag('js', new Date());
    window.gtag('config', id, { send_page_view: false, debug_mode: !import.meta.env.PROD });
}

/** Safely send an event to GA4 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
}

/** Best-effort GA client id extraction (fallback-friendly) */
export function getClientId(): { cid: string; source: 'gtag'|'cookie'|'fallback' } {
  // 1) Potential hook for gtag('get', 'G-XXXX', 'client_id', cb) — omitted to keep sync/simple
  try {
    if (typeof document !== 'undefined') {
      // 2) Parse cookies (_ga or _ga_*). Formats vary between GA3/GA4; we keep raw id if unsure.
      const cookies = document.cookie.split(';').map(s => s.trim());
      const ga = cookies.find(c => c.startsWith('_ga='));
      if (ga) {
        const val = decodeURIComponent(ga.split('=')[1] || '');
        const parts = val.split('.');
        if (parts.length >= 4) {
          const cid = `${parts[2]}.${parts[3]}`;
          if (/^\d+\.\d+$/.test(cid)) return { cid, source: 'cookie' };
        }
        return { cid: val, source: 'cookie' };
      }
      const ga4 = cookies.find(c => c.startsWith('_ga_'));
      if (ga4) {
        const val = decodeURIComponent(ga4.split('=')[1] || '');
        return { cid: val, source: 'cookie' };
      }
    }
  } catch {
    // ignore
  }

  // 3) Fallback: ephemeral pseudo-id
  return { cid: `lf_${Date.now()}_${Math.floor(Math.random()*1e6)}`, source: 'fallback' };
}

// Typed analytics façade
export type Variant = 'A' | 'B';
type UtmParams = Partial<Record<UTMKey, string>>;

export type AnalyticsEventMap = {
  page_view: { variant: Variant } & UtmParams;
  form_start: { variant: Variant } & UtmParams;
  plan_select_change: { variant: Variant; plan: PlanId } & UtmParams;
  pricing_interest_click: { variant: Variant; plan_id: PlanId | 'founder'; plan_variant?: 'founder' | 'regular' } & UtmParams;
  demo_view: { variant: 'B' } & UtmParams;
  demo_generate_click: { variant: 'B' } & UtmParams;
  sample_download: { variant: Variant } & UtmParams;
  footer_link_click: { variant: Variant; label: string; href: string } & UtmParams;
  lead_submit: {
    variant: Variant;
    profile: string;
    volume: string;
    plan_hint: 'starter' | 'business' | 'founder' | '';
    message_len: number;
    has_phone: boolean;
    cid: string;
  } & UtmParams;
  beta_signup: AnalyticsEventMap['lead_submit'];
};

export function track<E extends keyof AnalyticsEventMap>(name: E, params: AnalyticsEventMap[E]): void {
  trackEvent(name as string, params as Record<string, unknown>);
}
